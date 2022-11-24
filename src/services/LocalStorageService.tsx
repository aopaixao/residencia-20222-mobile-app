import EncryptedStorage from 'react-native-encrypted-storage';

const storeLocalData = async (key:string, value:any) => {
  try {
    await EncryptedStorage.setItem(
        key,
        JSON.stringify(value)
    );
    var tempData:any = await retrieveLocalData(key);
    //tempData = JSON.parse(tempData);
    console.log(`Dados armazenados: ${JSON.stringify(tempData, null, '\t')}`);
  } catch (error) {
    console.log(`Erro ao armazenar dados (key: ${key}) no LocalStorage: ${error}`);
  }
}

//Incrementa os dados no localstorage, de uma determinada key
const incrementLocalDataOld = async (key:string, value:any) => {
  var actualData:any = null;
  var data = [];
  //await clearStorage(); //limpa todos os dados atuais da key especificada. Usar para fins de teste
  try {
    //recupera os dados da key existentes atualmente
    actualData = await retrieveLocalData(key);
    //converte os dados, de JSON para objeto Javascript
    actualData = JSON.parse(actualData);
    //console.log(`actualData: ${JSON.stringify(actualData, null, '\t')}`);
    
    if (actualData !== undefined && actualData !== null) {
      //armazena os dados existentes atualmente no array data
      data.push(actualData);

      //transforma os dados recebidos pelo metodo num objeto JS
      value = JSON.parse(JSON.stringify(value))
      
      //adiciona os novos dados, recebidos, no array data, incrementando-os aos existentes atualmente
      data.push(value);

      //grava todos os dados, os atuais mais os novos, no storage
      storeLocalData(key, data);
    }else{
      //quando chamado pela primeira vez, caso nao exista ainda dados pra key, os armazena
      storeLocalData(key, value);
    }
  } catch (error) {
    console.log(`Erro ao recuperar dados (key: ${key}) do LocalStorage: ${error}`);
  }
}

//Incrementa os dados no localstorage, de uma determinada key
const incrementLocalData = async (key:string, value:any) => {
  var actualData:any = null;
  var data = [];
  //await clearStorage(); //limpa todos os dados atuais da key especificada. Usar para fins de teste
  try {
    //recupera os dados da key existentes atualmente
    actualData = await retrieveLocalData(key);
    console.log(`actualData: ${JSON.stringify(actualData, null, '\t')}`);

    //converte os dados, de JSON para objeto Javascript
    actualData = JSON.parse(actualData);

    console.log(`actualData Parsed: ${JSON.stringify(actualData, null, '\t')}`);
    
    if (actualData !== undefined && actualData !== null) {
      //verifica se há mais de um item já inserido no localstorare (ou seja, se é um array)
      //armazena os dados existentes atualmente no array data
      if(Array.isArray(actualData)){
        //percorre o array com os dados atuais e insere seu conteudo no array data
        actualData.map(k => (
          data.push(k)
        ));
      }else{
        data.push(actualData);
      }

      //transforma os dados recebidos pelo metodo num objeto JS
      //value = value))
      
      //adiciona os novos dados, recebidos, no array data, incrementando-os aos existentes atualmente
      data.push(value);

      console.log(`data before save: ${JSON.stringify(data, null, '\t')}`);

      //grava todos os dados, os atuais mais os novos, no storage
      storeLocalData(key, data);
    }else{
      //quando chamado pela primeira vez, caso nao exista ainda dados pra key, os armazena
      storeLocalData(key, value);
    }
  } catch (error) {
    console.log(`Erro ao recuperar dados (key: ${key}) do LocalStorage: ${error}`);
  }
}

const retrieveLocalData = async (key:string) => {
  var data = null;
  try {   
    data = await EncryptedStorage.getItem(key);
    //console.log(`Dados (key: ${key}) do LocalStorage: ${JSON.stringify(data)}`);
  } catch (error) {
    console.log(`Erro ao recuperar dados (key: ${key}) do LocalStorage: ${error}`);
  }
  return data;
}

const removeLocalData = async (key:string) => {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (error) {
    console.log(`Erro ao remover dados (key: ${key}) do LocalStorage: ${error}`);
  }
}

const removeFromFavoritosByKeyAndValue = async (key:string, codigoLivro:any) =>{
  var arrayJsonFavoritos:any = null;
  var arrayJsFavoritos = [];
  var arrayJsAlteradoFavoritos = [];
  try {
    //recupera os dados da key existentes atualmente
    arrayJsonFavoritos = await retrieveLocalData(key);
    
    //converte os dados de JSON para objeto Javascript
    arrayJsFavoritos = JSON.parse(arrayJsonFavoritos);
    
    //Percorre o array JS, filtrando o seu conteúdo e criando um novo array sem
    //  o elemento do array que contem o codigoLivro igual ao fornecido ao metodo
    arrayJsAlteradoFavoritos = arrayJsFavoritos.filter(function(e){
      return e.codigoLivro !== codigoLivro;
    })

    //salvar o array filtrado, sem o item removido
    storeLocalData(key, arrayJsAlteradoFavoritos);
  } catch (error) {
    console.log(`Erro ao remover dados (key: ${key}) com a valor do codigo do livro ${codigoLivro} do LocalStorage: ${error}`);
  }
}

const clearStorage = async () => {
  try {
      await EncryptedStorage.clear();
  } catch (error) {
    console.log(`Erro ao remover todos os dados`);
  }
}

export {storeLocalData, incrementLocalData, retrieveLocalData, removeLocalData, clearStorage, removeFromFavoritosByKeyAndValue};