import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { initDb, addReceita, getReceitas, deleteReceita, searchReceitas } from './database';

export default function App() {
  const [titulo, setTitulo] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [modoPreparo, setModoPreparo] = useState('');
  const [receitas, setReceitas] = useState([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    initDb();
    carregarReceitas();
  }, []);

  const carregarReceitas = () => {
    getReceitas(setReceitas);
  };

  const handleAdicionar = () => {
    if (titulo && ingredientes && modoPreparo) {
      addReceita(titulo, ingredientes, modoPreparo, sucesso => {
        if (sucesso) {
          setTitulo('');
          setIngredientes('');
          setModoPreparo('');
          carregarReceitas();
        }
      });
    }
  };

  const handleBuscar = () => {
    searchReceitas(busca, setReceitas);
  };

  const handleExcluir = id => {
    deleteReceita(id, sucesso => {
      if (sucesso) carregarReceitas();
    });
  };

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Nova Receita</Text>
      <TextInput placeholder="Título" value={titulo} onChangeText={setTitulo} style={{ borderBottomWidth: 1 }} />
      <TextInput placeholder="Ingredientes" value={ingredientes} onChangeText={setIngredientes} style={{ borderBottomWidth: 1 }} />
      <TextInput placeholder="Modo de Preparo" value={modoPreparo} onChangeText={setModoPreparo} style={{ borderBottomWidth: 1, marginBottom: 10 }} />
      <Button title="Adicionar Receita" onPress={handleAdicionar} />

      <TextInput placeholder="Buscar Receita" value={busca} onChangeText={setBusca} style={{ marginTop: 20, borderBottomWidth: 1 }} />
      <Button title="Buscar" onPress={handleBuscar} />

      <FlatList
        data={receitas}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, marginTop: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.titulo}</Text>
            <Text>Ingredientes: {item.ingredientes}</Text>
            <Text>Modo de Preparo: {item.modoPreparo}</Text>
            <Button title="Excluir" onPress={() => handleExcluir(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
