import React from "react";
import { Dimensions, StyleSheet } from 'react-native';

export const styles =  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#7054b6'
    },
    cabecalho: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    titulo: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#000'
    },
    conteudo: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    input: {
        borderWidth: 2,
        borderRadius: 10,
        width: Dimensions.get('window').width * 0.9,
        marginVertical: 10,
        paddingHorizontal: 15,
        paddingVertical: 13,
        fontWeight: "bold"
    },
    rodape: {
      flex: 1,
      alignItems: 'center'
    },
    botao: {
        backgroundColor: '#190152',
        width: Dimensions.get('window').width * 0.9,
        padding: 20,
        borderRadius: 10,
    },
    textoBotao: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18
    }
});