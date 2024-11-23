
// Importando componentes
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// Componente que cria os menus de seleção das unidades, assim como o spinner
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [valor, setValor] = useState(''); // Valor inserido pelo usuário
  const [unidadeEntrada, setUnidadeEntrada] = useState('metros'); // Unidade de entrada iniciada
  const [unidadeSaida, setUnidadeSaida] = useState('milhas'); // Unidade de saída iniciada
  const [resultado, setResultado] = useState(null); // Resultado da conversão

  // Tabela de conversão para simplificar os cálculos
  const fatoresConversao = {
    centimetros: 0.01,
    metros: 1,
    quilometros: 1000,
    milhas: 1609.34,
    
  };

  // Função para realizar a conversão
  const converter = () => {
    const valorNum = parseFloat(valor); // Converte para número
    if (isNaN(valorNum) || valorNum < 0) {
      setResultado('Por favor, insira um valor válido!');
      return;
    }

    // Realiza a conversão com base nos fatores
    const valorEmMetros = valorNum * fatoresConversao[unidadeEntrada]; // Converte para metros
    const valorConvertido = valorEmMetros / fatoresConversao[unidadeSaida]; // Converte para a unidade de saída

    setResultado(valorConvertido.toFixed(5)); // Mostra o resultado com 5 casas decimais
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversor de Unidades</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o valor"
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor} // Atualiza o estado ao digitar
      />

      <Text style={styles.label}>De:</Text>
      
       <Picker
        selectedValue={unidadeEntrada}
        onValueChange={(itemValue) => setUnidadeEntrada(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Centimetros" value="centimetros" />
        <Picker.Item label="Metros" value="metros" />
        <Picker.Item label="Quilômetros" value="quilometros" />
        <Picker.Item label="Milhas" value="milhas" />
        
      </Picker>

      <Text style={styles.label}>Para:</Text>
      <Picker
        selectedValue={unidadeSaida}
        onValueChange={(itemValue) => setUnidadeSaida(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Centimetros" value="centimetros" />
        <Picker.Item label="Metros" value="metros" />
        <Picker.Item label="Quilômetros" value="quilometros" />
        <Picker.Item label="Milhas" value="milhas" />
      </Picker>

      <Button title="Converter" onPress={converter} />

      {resultado !== null && (
        <Text style={styles.result}>
          {typeof resultado === 'string' ? resultado : `Resultado: ${resultado} ${unidadeSaida}`}
        </Text>
      )}
    </View>
  );
}
//Estiliza os componentes, como cores, fontes e layout.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  picker: {
    width: '100%',
    height: 50,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    color: '#333',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    color: '#555',
  },
});
