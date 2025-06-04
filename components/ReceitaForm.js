import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { addReceita } from '../database';

const ReceitaForm = ({ onReceitaAdicionada }) => {
  const [titulo, setTitulo] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [modoPreparo, setModoPreparo] = useState('');

  const handleAdicionar = () => {
    if (titulo && ingredientes && modoPreparo) {
      addReceita(titulo, ingredientes, modoPreparo, sucesso => {
        if (sucesso) {
          setTitulo('');
          setIngredientes('');
          setModoPreparo('');
          onReceitaAdicionada(); // Atualiza lista
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nova Receita</Text>
      <TextInput
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
      />
      <TextInput
        placeholder="Ingredientes"
        value={ingredientes}
        onChangeText={setIngredientes}
        style={styles.input}
      />
      <TextInput
        placeholder="Modo de Preparo"
        value={modoPreparo}
        onChangeText={setModoPreparo}
        style={styles.input}
      />
      <Button title="Adicionar Receita" onPress={handleAdicionar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  label: { fontSize: 20, marginBottom: 10 },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingVertical: 4,
    paddingHorizontal: 8
  }
});

export default ReceitaForm;
