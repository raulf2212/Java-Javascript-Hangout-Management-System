import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, RefreshControl,Image } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config.jsx';

const MyHangoutsScreen = ({ user, onOpenChat }) => {
  const [data, setData] = useState({ hosted: [], joined: [] });
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/my-activity/${user.id}`);
      setData(res.data);
    } catch (e) { setData({ hosted: [], joined: [] }); }
    finally { setLoading(false); }
  };

  const deleteHangout = (id) => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel" },
      { text: "Delete", onPress: async () => {
        await axios.delete(`${API_URL}/hangout/${id}`);
        load();
      }}
    ]);
  };

  useEffect(() => { load(); }, []);

  return (
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}>
      <Text style={styles.title}>HOSTED HANGOUTS</Text>
      {data.hosted.map(e => (
        <View key={e.id} style={styles.card}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => onOpenChat(e)}>
            <Text style={styles.cardTitle}>{e.title}</Text>
            <Text style={styles.cardSub}>{e.location}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteHangout(e.id)}>
            <Image 
    source={require('../../assets/delete-bin.png')} 
    style={{ width: 25, height: 25, marginLeft: 10 }} 
  />
          </TouchableOpacity>
        </View>
      ))}

      <Text style={[styles.title, { marginTop: 30 }]}>JOINED HANGOUTS</Text>
      {data.joined.map(e => (
        <TouchableOpacity key={e.id} style={styles.card} onPress={() => onOpenChat(e)}>
          <Text style={styles.cardTitle}>{e.title}</Text>
          <Text style={styles.cardSub}>{e.location}</Text>
        </TouchableOpacity>
      ))}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 60, paddingHorizontal: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  card: { padding: 15, borderWidth: 2, borderRadius: 20, marginBottom: 12, borderColor: '#000', flexDirection: 'row', alignItems: 'center' },
  cardTitle: { fontWeight: 'bold', fontSize: 16 },
  cardSub: { fontSize: 12, color: '#666', marginLeft:10 },
  delText: { fontSize: 20, marginLeft: 10 }
});

export default MyHangoutsScreen;