import React, { createContext, useContext, useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface AlertContextType {
    alert: { visible: boolean, message: string };
    createAlert: (message: string) => void;
    hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType>({
    alert: { visible: false, message: '' },
    createAlert: () => {},
    hideAlert: () => {}
});

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ visible: false, message: '' });

  const createAlert = (message) => {
    setAlert({ visible: true, message });
  };

  const hideAlert = () => {
    setAlert({ visible: false, message: '' });
  };

  return (
    <AlertContext.Provider value={{ alert, createAlert, hideAlert }}>
      {children}
      <CustomAlert />
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    maxWidth: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertText: {
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'MADETOMMY-BOLD',
    marginLeft: 10,
  },
});

const CustomAlert = () => {
  const { alert, hideAlert } = useAlert();

  const handleOverlayPress = () => {
    hideAlert();
  };

  return (
    <Modal
      visible={alert.visible}
      transparent
      animationType="fade"
      onRequestClose={hideAlert}
    >
      <TouchableOpacity style={styles.overlay} onPress={handleOverlayPress}>
        <View style={styles.alertBox}>
          <FontAwesome name="info" size={24} color="#175dcf" />
          <Text style={styles.alertText}>{alert.message}</Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default CustomAlert;