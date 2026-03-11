import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Image, Alert } from 'react-native';
import axios from 'axios'; 
import { API_URL } from '../config.jsx'; 

const LoginScreen = ({ onLogin }) => {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!userId.trim()) return;
    
    setLoading(true);
    try {
      await axios.post(`${API_URL}/login`, { id: userId });
      
      onLogin(userId);
    } catch (error) {
      Alert.alert("Error", "Could not connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerSection}>
        <View style={styles.profileCircle}>
          <Image 
            source={require('../../assets/user-icon.png')} 
            style={{ width: 60, height: 60 }} 
          />
        </View>
        <Text style={styles.welcomeText}>Welcome!</Text>
        <Text style={styles.subText}>Sign in to start hanging out</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>STUDENT ID</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter your ID (e.g. 123)"
          value={userId}
          onChangeText={setUserId}
        />
        
        <TouchableOpacity 
          style={styles.loginBtn} 
          onPress={handleSignIn}
          disabled={loading}
        >
          <Text style={styles.loginBtnText}>
            {loading ? "SIGNING IN..." : "SIGN IN"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 30, justifyContent: 'center' },
  headerSection: { alignItems: 'center', marginBottom: 50 },
  profileCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  welcomeText: { fontSize: 32, fontWeight: 'bold' },
  subText: { color: '#888', marginTop: 5 },
  form: { marginTop: 20 },
  label: { fontSize: 12, fontWeight: 'bold', color: '#555', marginBottom: 10, letterSpacing: 1 },
  input: { borderBottomWidth: 2, borderColor: '#eee', paddingVertical: 10, fontSize: 18, marginBottom: 40 },
  loginBtn: { backgroundColor: '#000', padding: 20, borderRadius: 15, alignItems: 'center' },
  loginBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});

export default LoginScreen;