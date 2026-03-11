import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Alert , Image} from 'react-native';
import axios from 'axios';
import { API_URL } from '../config.jsx';

const HangoutDetailModal = ({ visible, item, user, onClose }) => {
  if (!item) return null;

  const join = async () => {
    try {
      const res = await axios.post(`${API_URL}/join-hangout`, { 
        hangoutId: item.id, 
        userId: user.id 
      });
      const status = res.data.response;

      if (status === "SUCCESS") {
        Alert.alert("Success", "You joined the hangout!");
        onClose();
      } else if (status === "FULL") {
        Alert.alert("Full", "This hangout has reached its participant limit.");
      } else if (status === "ALREADY_JOINED") {
        Alert.alert("Note", "You are already a participant.");
      } else {
        Alert.alert("Error", "Could not join hangout.");
      }
    } catch (e) {
      Alert.alert("Error", "Connection failed.");
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.desc}>{item.description}</Text>
          <Text style={styles.info}><Image 
                          source={require('../../assets/pin.png')} 
                          style={{ width: 25, height: 25 }} 
                        /> {item.location}</Text>
          <Text style={styles.info}><Image 
                          source={require('../../assets/group.png')} 
                          style={{ width: 25, height: 25 }} 
                        /> Max: {item.max_participants}</Text>
          
          <TouchableOpacity style={styles.joinBtn} onPress={join}>
            <Text style={styles.btnText}>JOIN HANGOUT</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>CLOSE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  content: { backgroundColor: '#fff', borderRadius: 20, padding: 25 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  desc: { fontSize: 16, color: '#444', marginBottom: 15 },
  info: { fontSize: 14, color: '#666', marginBottom: 5 },
  joinBtn: { backgroundColor: '#000', padding: 15, borderRadius: 30, marginTop: 20 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  closeBtn: { marginTop: 15 },
  closeText: { textAlign: 'center', color: '#999' }
});

export default HangoutDetailModal;