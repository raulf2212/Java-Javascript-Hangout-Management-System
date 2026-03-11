import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity, RefreshControl } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config.jsx';
import HangoutCard from '../components/HangoutCard.jsx';
import HangoutDetailModal from '../components/HangoutDetailModal.jsx';

const DashboardScreen = ({ onHostPress, user }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/hangouts`);
      setData(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Explore</Text>
        <TouchableOpacity onPress={onRefresh}>
          <Text style={styles.refreshIcon}><Image 
                          source={require('../../assets/refresh.png')} 
                          style={{ width: 30, height: 30 }} 
                        /></Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <HangoutCard 
              item={item} 
              onPress={() => {
                setSelectedItem(item);
                setModalVisible(true);
              }} 
            />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No hangouts found. Be the first to host!</Text>
          }
        />
      )}

      <HangoutDetailModal 
        visible={modalVisible} 
        item={selectedItem} 
        user={user} 
        onClose={() => setModalVisible(false)} 
      />

      <TouchableOpacity style={styles.fab} onPress={onHostPress}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, marginBottom: 20 },
  header: { fontSize: 28, fontWeight: 'bold' },
  refreshIcon: { fontSize: 20 },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#999' },
  fab: { 
    position: 'absolute', 
    right: 25, 
    bottom: 25, 
    width: 65, 
    height: 65, 
    borderRadius: 32.5, 
    backgroundColor: '#000', 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  fabText: { color: '#fff', fontSize: 35, fontWeight: '300' }
});

export default DashboardScreen;