# Como Rodar a Aplicação

É necessário possuir **Node.js** e **Expo CLI** instalado em seu desktop, e um dispositivo móvel com **Expo Go**.

## Pré-requisitos

- Verifique a presença do Node.js:
  ```bash
  node --version   # Deve retornar v18.x ou superior
  npm --version    # Deve retornar v9.x ou superior
  ```
  Caso esteja ausente, instale a partir de: [https://nodejs.org/pt](https://nodejs.org/pt)

- Verifique a presença do Expo CLI:
  ```bash
  expo --version   # Deve retornar a versão instalada (ex: 7.x)
  ```
  Caso esteja ausente, execute no terminal:
  ```bash
  npm install -g expo-cli
  ```

- Caso possua problemas com o Expo GO, recomendo o seguinte tutorial:  
  [https://youtu.be/xKGESzemfdw?si=FYsF8Y7M9ywaVL4g](https://youtu.be/xKGESzemfdw?si=FYsF8Y7M9ywaVL4g)

## Clonando e Rodando o Projeto

1. Clone o repositório.
2. Com o repositório aberto na IDE de sua preferência, execute:
   ```bash
   cd BookRegisterApp

   npm install @react-navigation/native @react-navigation/native-stack
   npx expo install react-native-screens react-native-safe-area-context
   npx expo install react-native-gesture-handler react-native-reanimated
   npm install redux react-redux @reduxjs/toolkit
   npx expo install react-dom react-native-web @expo/metro-runtime
   ```
3. Inicie a aplicação:
   ```bash
   npm start
   ```

4. Você pode agora escanear o QR code que aparecerá no terminal com seu dispositivo móvel para abrir a aplicação, ou pressionar **"a"** para abrir o emulador Android (caso tenha seguido o tutorial mencionado).

---

# Onde foi utilizado Hooks

## `BookRegisterApp/context/TemaContext.js`

```jsx
export const TemaProvider = ({ children }) => {
  const [tema, setTema] = useState('claro');

  const alternarTema = () => {
    setTema((prev) => (prev === 'claro' ? 'escuro' : 'claro'));
  };    

  return (
    <TemaContext.Provider value={{ tema, alternarTema }}>
      {children}
    </TemaContext.Provider>
  );
};
```
> A fim de setar o estado para claro como padrão.

## `BookRegisterApp/screens/TemaContext.js`

```jsx
const [livros, setLivros] = useState([]);
const [nome, setNome] = useState('');
const [autor, setAutor] = useState('');
const [genero, setGenero] = useState('');
const [fotoCapa, setFotoCapa] = useState('');
const [idEditar, setIdEditar] = useState(null);
```
> O destaque cria um array com a finalidade de salvar os livros.

### Adicionar item (spread operator)
```jsx
setLivros([...livros, novoLivro]);
```

### Editar item (map)
```jsx
setLivros(livros.map(livro => livro.id === idEditar ? livroAtualizado : livro));
```

### Excluir item (filter)
```jsx
setLivros(livros.filter(a => a.id !== id));
```

---

# Uso de Redux

Define um "slice" (fatia) do estado global chamado `livros`:
- Gerencia apenas o valor total (inicialmente 0)
- Oferece duas ações:
  - `incrementar`: adiciona 1 ao total
  - `decrementar`: subtrai 1 (se total > 0)

Está presente nos arquivos dentro da pasta `redux`.

---

# Context

Declarado em:

```jsx
import React, { createContext, useState, useContext } from 'react';

const TemaContext = createContext();

export const TemaProvider = ({ children }) => {
  const [tema, setTema] = useState('claro');

  const alternarTema = () => {
    setTema((prev) => (prev === 'claro' ? 'escuro' : 'claro'));
  };

  return (
    <TemaContext.Provider value={{ tema, alternarTema }}>
      {children}
    </TemaContext.Provider>
  );
};

export const useTema = () => useContext(TemaContext);
```

Utilizado por todo o código da aplicação:

- `App.js`: TemaProvider
- `CadastroLivros.js`: useTema
- `configuracoes.js`: useTema

> Serve para compartilhar dados entre componentes sem precisar passar props manualmente em cada nível da árvore de componentes.