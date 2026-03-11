import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar, Image } from 'react-native';
import DashboardScreen from './src/screens/DashboardScreen.jsx';
import HostScreen from './src/screens/HostScreen.jsx';
import ProfileScreen from './src/screens/ProfileScreen.jsx';
import MyHangoutsScreen from './src/screens/MyHangoutsScreen.jsx';
import LoginScreen from './src/screens/LoginScreen.jsx';
import ChatScreen from './src/screens/ChatScreen.jsx';

export default function App() {
  const [user, setUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [selectedChat, setSelectedChat] = useState(null);

  if (!user) {
    return <LoginScreen onLogin={(id) => setUser({ id, name: 'Student_' + id })} />;
  }

  if (selectedChat) {
    return <ChatScreen hangout={selectedChat} onBack={() => setSelectedChat(null)} />;
  }

  const renderScreen = () => {
    switch(currentScreen) {
      case 'dashboard': 
        return <DashboardScreen onHostPress={() => setCurrentScreen('host')} user={user} />;
      case 'myhangouts': 
        return <MyHangoutsScreen user={user} onOpenChat={(item) => setSelectedChat(item)} />;
      case 'profile': 
        return <ProfileScreen user={user} onLogout={() => setUser(null)} />;
      case 'host': 
        return <HostScreen onBack={() => setCurrentScreen('dashboard')} user={user} />;
      default: 
        return <DashboardScreen user={user} />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>{renderScreen()}</View>
      {currentScreen !== 'host' && (
        <View style={styles.navBar}>
          <TouchableOpacity 
            onPress={() => setCurrentScreen('dashboard')}
            style={[styles.tab, currentScreen === 'dashboard' && styles.activeTab]}
          >
            <Image 
              source={require('./assets/home.png')} 
              style={[styles.icon, currentScreen === 'dashboard' ? styles.activeIcon : styles.inactiveIcon]} 
            />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setCurrentScreen('myhangouts')}
            style={[styles.tab, currentScreen === 'myhangouts' && styles.activeTab]}
          >
            <Image 
              source={require('./assets/activity.png')} 
              style={[styles.icon, currentScreen === 'myhangouts' ? styles.activeIcon : styles.inactiveIcon]} 
            />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setCurrentScreen('profile')}
            style={[styles.tab, currentScreen === 'profile' && styles.activeTab]}
          >
            <Image 
              source={require('./assets/user-icon.png')} 
              style={[styles.icon, currentScreen === 'profile' ? styles.activeIcon : styles.inactiveIcon]} 
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1 },
  navBar: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center',
    borderTopWidth: 1, 
    borderColor: '#eee', 
    backgroundColor: '#f2f1f1', 
    height: 60,
    marginBottom:50
  },
  tab: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeTab: {
    backgroundColor: '#e6e5e5'
  },
  icon: { width: 25, height: 25 },
  activeIcon: { opacity: 1 },
  inactiveIcon: { opacity: 0.3 }
});