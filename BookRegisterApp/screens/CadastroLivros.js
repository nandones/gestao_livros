import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import LivroCard from '../components/LivroCard';
import { useDispatch, useSelector } from 'react-redux';
import { incrementar, decrementar } from '../redux/livroSlice';
import { useTema } from '../context/TemaContext';

export default function CadastroLivros({ navigation }) {
  const [livros, setLivros] = useState([]);
  const [nome, setNome] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [fotoCapa, setFotoCapa] = useState('');
  const [idEditar, setIdEditar] = useState(null);

  const dispatch = useDispatch();
  const total = useSelector((state) => state.livros.total);
  const { tema } = useTema();

  const salvar = () => {
    if (!nome || !autor || !fotoCapa || !genero) return;

    if (idEditar !== null) {
      // Mantém o ID original ao editar
      setLivros(livros.map(livro => 
        livro.id === idEditar 
          ? { ...livro, nome, autor, genero, fotoCapa } //Spread operator + shorthand properties
          : livro
      ))
      setIdEditar(null);
    } else {
      // Gera novo ID apenas no cadastro
      const novoLivro = { 
        id: Date.now(), 
        nome, 
        autor, 
        genero, 
        fotoCapa 
      };
      setLivros([...livros, novoLivro]);
      dispatch(incrementar());
    }

    setNome('');
    setAutor('');
    setGenero('');
    setFotoCapa('');
  };

  const editar = (livro) => {
    setNome(livro.nome);
    setAutor(livro.autor);
    setGenero(livro.genero);
    setFotoCapa(livro.fotoCapa);
    setIdEditar(livro.id); // Define o ID do livro sendo editado
  };

  const excluir = (id) => {
    setLivros(livros.filter(a => a.id !== id));
    dispatch(decrementar());
    if (id === idEditar) {
      setIdEditar(null);
      setNome('');
      setAutor('');
      setGenero('');
      setFotoCapa('');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: tema === 'claro' ? '#f9f9f9' : '#333' }]}>
      <Text style={[styles.titulo, { color: tema === 'claro' ? '#000' : '#fff' }]}>
        Total de Livros: {total}
      </Text>

      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="Autor" value={autor} onChangeText={setAutor} style={styles.input} />
      <TextInput placeholder="URL da Foto da Capa" value={fotoCapa} onChangeText={setFotoCapa} style={styles.input} />
      <TextInput placeholder="Genero" value={genero} onChangeText={setGenero} style={styles.input} />

      <Button title={idEditar !== null ? "Atualizar" : "Cadastrar"} onPress={salvar} />

      <FlatList
        data={livros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <LivroCard 
            livro={item} 
            onEditar={editar} 
            onExcluir={excluir} 
            modoEdicao={idEditar === item.id}
          />
        )}
      />

      <View style={{ marginTop: 20 }}>
        <Button title="Ir para Configurações" onPress={() => navigation.navigate('Configuracoes')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  titulo: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
});