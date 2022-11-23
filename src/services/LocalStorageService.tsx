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
const incrementLocalData = async (key:string, value:any) => {
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

const clearStorage = async () => {
  try {
      await EncryptedStorage.clear();
  } catch (error) {
    console.log(`Erro ao remover todos os dados`);
  }
}

export {storeLocalData, incrementLocalData, retrieveLocalData, removeLocalData};