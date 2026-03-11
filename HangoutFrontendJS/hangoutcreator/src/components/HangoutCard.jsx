import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HangoutCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.details}>{item.location} • {item.category}</Text>
      </View>
      <View style={styles.arrowContainer}>
        <Text style={styles.arrow}>→</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { 
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    borderWidth: 2, 
    borderColor: '#000', 
    borderRadius: 20, 
    padding: 20, 
    marginBottom: 15, 
    alignItems: 'center' 
  },
  info: { flex: 1 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  details: { fontSize: 13, color: '#666' },
  arrowContainer: { marginLeft: 10 },
  arrow: { fontSize: 20, fontWeight: 'bold' }
});

export default HangoutCard;