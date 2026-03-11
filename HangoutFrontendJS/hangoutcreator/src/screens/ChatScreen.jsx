import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

const ChatScreen = ({ hangout, onBack }) => {
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: 'Welcome to the hangout!', user: 'System' }
  ]);

  const send = () => {
    if (!msg) return;
    setMessages([...messages, { id: Date.now().toString(), text: msg, user: 'Me' }]);
    setMsg('');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}><Text style={styles.back}>←</Text></TouchableOpacity>
        <Text style={styles.title}>{hangout.title}</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.msgBox, item.user === 'Me' ? styles.myMsg : styles.theirMsg]}>
            <Text style={styles.msgText}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
      <View style={styles.inputRow}>
        <TextInput style={styles.input} value={msg} onChangeText={setMsg} placeholder="Message..." />
        <TouchableOpacity onPress={send}><Text style={styles.send}>SEND</Text></TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { paddingTop: 50, padding: 20, borderBottomWidth: 1, borderColor: '#eee', flexDirection: 'row', alignItems: 'center' },
  back: { fontSize: 24, marginRight: 15 },
  title: { fontSize: 18, fontWeight: 'bold' },
  list: { padding: 20 },
  msgBox: { padding: 12, borderRadius: 15, marginBottom: 10, maxWidth: '80%' },
  myMsg: { alignSelf: 'flex-end', backgroundColor: '#000' },
  theirMsg: { alignSelf: 'flex-start', backgroundColor: '#f0f0f0' },
  msgText: { color: '#fff' },
  inputRow: { flexDirection: 'row', padding: 20, borderTopWidth: 1, borderColor: '#eee', alignItems: 'center' },
  input: { flex: 1, height: 40, backgroundColor: '#f5f5f5', borderRadius: 20, paddingHorizontal: 15 },
  send: { marginLeft: 10, fontWeight: 'bold' }
});

export default ChatScreen;