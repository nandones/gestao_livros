import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

export default function LivroCard({ livro, onEditar, onExcluir }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: livro.fotoCapa }} style={styles.imagem} />
      <View style={styles.info}>
        <Text style={styles.nome}>{livro.nome}</Text>
        <Text style={styles.demais_infos}>Autor: {livro.autor}</Text>
        <Text style={styles.demais_infos}>Genero: {livro.genero}</Text>
        <Text style={styles.demais_infos}>id: {livro.id}</Text>
        <View style={styles.botoes}>
          <Button title="Editar" onPress={() => onEditar(livro)} />
          <Button title="Excluir" onPress={() => onExcluir(livro.id)} color="#c00" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  imagem: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  demais_infos: {
    fontSize: 14,
    color: '#666',
  },
  botoes: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 10,
  },
});
