import EncryptedStorage from 'react-native-encrypted-storage';

const storeLocalData = async (key:string, value:any) => {
  try {
    await EncryptedStorage.setItem(
        key,
        value
    );
  } catch (error) {
    console.log(`Erro ao armazenar dados (key: ${key}) no LocalStorage: ${error}`);
  }
}

const retrieveLocalData = async (key:string) => {
  try {   
    const data = await EncryptedStorage.getItem(key);

    if (data !== undefined) {
        return data;
    }
  } catch (error) {
    console.log(`Erro ao recuperar dados (key: ${key}) do LocalStorage: ${error}`);
  }
}

const removeLocalData = async (key:string) => {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (error) {
    console.log(`Erro ao remover dados (key: ${key}) do LocalStorage: ${error}`);
  }
}

export {storeLocalData, retrieveLocalData, removeLocalData};