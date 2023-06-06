import React, { useRef } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Animated } from 'react-native';

export default function App() {
  const rotationValue = useRef(new Animated.Value(0)).current;

  const rotateImage = () => {
    Animated.timing(rotationValue, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      rotationValue.setValue(0);
    });
  };

  const interpolatedRotateAnimation = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const imageStyle = {
    transform: [{ rotate: interpolatedRotateAnimation }],
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={rotateImage}>
        <Animated.Image
          source={require('./assets/fruit_orange.png')}
          style={[styles.image, imageStyle]}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});
