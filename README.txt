README

Prerequisites:

-Node.js & npm
-MySQL Server
-Expo go mobile app

Database Setup:

-Open MySQLWorkbench
-Run provided SQL Script (Create_DB.sql)
-Database Credentials:
	-User: root
	-Password:(empty)
	-Port: 3306

Java Setup:

-Run Maven Project

Backend Setup:

-Navigate to folder "index.js"
-Change line 9 ip_address "client.connect(8080, 'ip_address', ..." to current computer's IP Address
-Install dependencies: npm install express net
-Start Server: node index.js

Frontend Setup:

-Install dependencies:
	-npm install
	-npx expo install axios expo-navigation-bar
-Open src/config.jsx -> Change ip_address "export const API_URL = 'http://ip_address:3000';" to current computer's IP Address
-Start the app: npx expo start
-Scan QR Code with Expo Go mobile app (Phone must be on the same Wi-Fi as the computer).

