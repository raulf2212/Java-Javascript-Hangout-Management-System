import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config.jsx';

const VALID_CATEGORIES = ['Social', 'Sports', 'Study', 'Gaming', 'Food', 'Other'];

const HostScreen = ({ onBack, user }) => {
  const [form, setForm] = useState({ 
    title: '', location: '', category: '', max_participants: '', description: ''
  });

  const submit = async () => {
    if (!form.title || !form.location || !form.description || !form.max_participants) {
      return Alert.alert("Error", "All fields are required");
    }
    if (!VALID_CATEGORIES.includes(form.category)) {
      return Alert.alert("Error", "Please select a valid category");
    }
    if (isNaN(form.max_participants) || parseInt(form.max_participants) <= 0) {
      return Alert.alert("Error", "Max participants must be a valid number");
    }

    try {
      const res = await axios.post(`${API_URL}/create-hangout`, { 
        ...form, 
        leader_id: user.id,
        date_time: new Date().toISOString().replace('T', ' ').split('.')[0] 
      });


      if (res.data.response && res.data.response.startsWith("SUCCESS")) {
        Alert.alert("Success", "Hangout Created!", [{ text: "OK", onPress: onBack }]);
      } else {
        Alert.alert("Failed", "Database could not save: " + JSON.stringify(res.data));
      }
    } catch (err) { 
      Alert.alert("Error", "Server Connection Error"); 
    }
  };

  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}><Text style={styles.backText}>← Back</Text></TouchableOpacity>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>HOST A HANGOUT!</Text>
        
        <View style={styles.field}>
          <Text style={styles.label}>TITLE:</Text>
          <TextInput style={styles.input} onChangeText={t => setForm({...form, title: t})} placeholder="Enter Title" />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>DESCRIPTION:</Text>
          <TextInput style={styles.input} onChangeText={t => setForm({...form, description: t})} placeholder="What are we doing?" />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>LOCATION:</Text>
          <TextInput style={styles.input} onChangeText={t => setForm({...form, location: t})} placeholder="Where?" />
        </View>

        <Text style={styles.label}>CATEGORY:</Text>
        <View style={styles.categoryRow}>
          {VALID_CATEGORIES.map(cat => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.catBtn, form.category === cat && styles.catBtnActive]}
              onPress={() => setForm({...form, category: cat})}
            >
              <Text style={[styles.catText, form.category === cat && styles.catTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>MAX PARTICIPANTS:</Text>
          <TextInput 
            style={styles.input} 
            keyboardType="numeric"
            onChangeText={t => setForm({...form, max_participants: t})} 
            placeholder="e.g. 5"
          />
        </View>

        <TouchableOpacity style={styles.btn} onPress={submit}><Text style={styles.btnText}>HOST!</Text></TouchableOpacity>
        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
  backButton: { paddingHorizontal: 20, marginBottom: 10 },
  backText: { fontSize: 16, fontWeight: 'bold' },
  container: { flex: 1, paddingHorizontal: 25 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  field: { marginBottom: 20 },
  label: { fontSize: 12, fontWeight: 'bold', color: '#555', marginBottom: 5 },
  input: { borderBottomWidth: 1, borderColor: '#ccc', paddingVertical: 8, fontSize: 16 },
  categoryRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20, marginTop: 10 },
  catBtn: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#000', marginRight: 10, marginBottom: 10 },
  catBtnActive: { backgroundColor: '#000' },
  catText: { fontSize: 13, color: '#000' },
  catTextActive: { color: '#fff' },
  btn: { backgroundColor: '#000', padding: 18, borderRadius: 35, marginTop: 10 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }
});

export default HostScreen;