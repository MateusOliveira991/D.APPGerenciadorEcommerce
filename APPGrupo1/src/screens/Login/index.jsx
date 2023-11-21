import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const authenticateUser = async (email, senha) => {
    try {
      setLoading(true);

      const response = await axios.get(`https://6513726b8e505cebc2e9db94.mockapi.io/clientes?email=${email}`);

      if (response.status === 200) {
        const userData = response.data;

        if (userData.length > 0) {
          const user = userData[0];
          if (user.senha === senha) {
            Alert.alert('Login bem-sucedido!');
            navigation.navigate('Home');
            setFormData({ email: '', senha: '' });
          } else {
            Alert.alert('Senha incorreta. Tente novamente.');
          }
        } else {
          Alert.alert('Email não encontrado. Verifique as credenciais.');
        }
      } else {
        Alert.alert('Erro ao buscar usuário. Tente novamente mais tarde.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Alert.alert('Erro ao fazer login. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const goToCadastro = () => {
    navigation.navigate('Cadastro');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao App do grupo I</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => setFormData((prevData) => ({ ...prevData, email: value }))}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={formData.senha}
        onChangeText={(value) => setFormData((prevData) => ({ ...prevData, senha: value }))}
        secureTextEntry
      />

      <Button
        title={loading ? 'Carregando...' : 'Login'}
        onPress={() => authenticateUser(formData.email, formData.senha)}
        disabled={loading}
      />

      <TouchableOpacity onPress={goToCadastro}>
        <Text style={styles.signupText}>Não tem uma conta? Cadastre-se aqui</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingLeft: 10,
    width: '85%', 
  },
  signupText: {
    marginTop: 10,
    color: 'blue',
  },
});
