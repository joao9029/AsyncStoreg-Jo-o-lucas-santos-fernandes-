import React, { useState, useEffect } from "react";
import {View, Text, TextInput , TouchableOpacity , FlatList , StyleSheet , SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";


import AsyncStorage from "@react-native-async-storage/async-storage";


export default function App() {
  const [tarefa, setTarefa] = useState("");
  const [lista, setLista] = useState([]);

  useEffect(() => {
    carregarTarefas();
  }, []);

  const salvarTarefas = async (novaLista) => {
    try {
      await AsyncStorage.setItem("tarefas", JSON.stringify(novaLista));
    } catch (error) {
      console.log("Erro ao salvar:", error);
    }
  };

  const carregarTarefas = async () => {
    try {
      const dados = await AsyncStorage.getItem("tarefas");
      if (dados !== null) {
        setLista(JSON.parse(dados));
      }
    } catch (error) {
      console.log("Erro ao carregar:", error);
    }
  };

  const adicionarTarefa = () => {
    if (tarefa.trim() === "") return;

    const novaLista = [...lista, tarefa];
    setLista(novaLista);
    salvarTarefas(novaLista);
    setTarefa("");
  };

 const deletarTarefa = (index) => {
  const novaLista = lista.filter((_, i) => i !== index);
  setLista(novaLista);
  salvarTarefas(novaLista);
};

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Lista</Text>
       

      <View style={styles.inputArea}>
        <TextInput
          placeholder="Digite uma tarefa..."
          placeholderTextColor="#999"
          value={tarefa}
          onChangeText={setTarefa}
          style={styles.input}
        />

        <TouchableOpacity style={styles.botao} onPress={adicionarTarefa}>
          <Text style={styles.botaoTexto}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={lista}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item, index }) => (
        <View style={styles.item}>
        <Text style={styles.itemTexto}>{item}</Text>

         <TouchableOpacity onPress={() => deletarTarefa(index)}>
        <Ionicons name="close" size={22} color="#23f" />
        </TouchableOpacity>
        </View>
)}
      
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titulo: {
    marginTop: 90,
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  inputArea: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  botao: {
    backgroundColor: "#23f",
    padding: 14,
    borderRadius: 5,
    alignItems: "center",
    width: 100,
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  item: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  itemTexto: {
    fontSize: 16,
    color: "#333",
  },
});
