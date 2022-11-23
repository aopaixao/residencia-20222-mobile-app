import React, { createContext, useState } from "react";
import jwt_decode from 'jwt-decode';

//Importando o DadosUsuarioType
import { DadosUsuarioType } from "../models/DadosUsuarioType";

//Criando o Contexto
export const DataContext = createContext({});

//Criando o provedor do Contexto
export const DataProvider = ({children}) => {
  const [dadosUsuario, setDadosUsuario] = useState<DadosUsuarioType>();
  const [editoraSelecionada, setEditoraSelecionada] = useState<number>();

  const armazenaDadosUsuario = (jwt:any) => {
    var tokenDecodificado:any = jwt_decode(jwt);

    //Armazenando apenas a chave usuario da string json decodificada
    var usuario = tokenDecodificado.usuario;
    
    //"{\"userId\":1,\"usuarioNome\":\"Alexandre\",\"userEmail\":\"ale@mail.com\"}"

    //Transformando a string json contida dentro da variavel usuario num objeto javascript
    usuario = JSON.parse(usuario);

    setDadosUsuario({
      id: usuario?.userId,
      nome: usuario?.usuarioNome,
      email: usuario?.userEmail,
      token: jwt
    });
  }

  const armazenaEditoraSelecionada = (id:number) => {
    setEditoraSelecionada(id);
  }

  return (
    <DataContext.Provider value={{
      dadosUsuario,
      armazenaDadosUsuario,
      armazenaEditoraSelecionada
    }}>
      {children}
    </DataContext.Provider>
  );
}