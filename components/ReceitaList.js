import React, { useState } from 'react';
import { View, FlatList, Text, TextInput, Button, StyleSheet } from 'react-native';
import { deleteReceita, searchReceitas } from '../database';

const ReceitaList = ({ receitas, atualizarLista }) => {
  const [busca, setBusca] = useState('');

  const handleBuscar = () => {
    if (busca.trim() !== '') {
      searchReceitas(busca, atualizarLista);
    } else {
      atualizarLista(); 
    }
  };

  const handleExcluir = (id) => {
    deleteReceita(id, sucesso => {
      if (sucesso) atualizarLista();
    });
  };

  return (
    <View>
      <TextInput
        placeholder="Buscar Receita por Título"
        value={busca}
        onChangeText={setBusca}
        style={styles.input}
      />
      <Button title="Buscar" onPress={handleBuscar} />

      <FlatList
        data={receitas}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text>Ingredientes: {item.ingredientes}</Text>
            <Text>Modo de Preparo: {item.modoPreparo}</Text>
            <Button title="Excluir" onPress={() => handleExcluir(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingVertical: 4,
    paddingHorizontal: 8
  },
  card: {
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    backgroundColor: '#fafafa'
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4
  }
});

export default ReceitaList;
