import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const ProfileScreen = ({ user, onLogout }) => {
  const interests = ['Sports', 'Gaming', 'Music', 'Coding', 'Hiking'];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.banner} />
      <View style={styles.headerSection}>
        <View style={styles.profilePic}>
          <Image 
                source={require('../../assets/user-icon.png')} 
                style={{ width: 60, height: 60 }} 
              />
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.bio}>Student ID: {user.id}</Text>
        
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>EDIT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.editBtn, styles.logoutBtn]} onPress={onLogout}>
            <Text style={[styles.editBtnText, styles.logoutText]}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>INTERESTS</Text>
        <View style={styles.tagContainer}>
          {interests.map(item => (
            <View key={item} style={styles.tag}>
              <Text style={styles.tagText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  banner: { height: 120, backgroundColor: '#E0E0E0' },
  headerSection: { alignItems: 'center', marginTop: -50 },
  profilePic: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#f0f0f0', borderWidth: 5, borderColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  picText: { fontSize: 40 },
  name: { fontSize: 24, fontWeight: 'bold', marginTop: 10 },
  bio: { color: '#666', marginTop: 5 },
  btnRow: { flexDirection: 'row', marginTop: 15 },
  editBtn: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f0f0f0', marginHorizontal: 5 },
  editBtnText: { color: '#000', fontSize: 12, fontWeight: 'bold' },
  logoutBtn: { backgroundColor: '#ffeeee' },
  logoutText: { color: '#ff4444' },
  section: { padding: 20 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  tagContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  tag: { backgroundColor: '#f0f0f0', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, marginRight: 10, marginBottom: 10 },
  tagText: { fontSize: 13 }
});

export default ProfileScreen;