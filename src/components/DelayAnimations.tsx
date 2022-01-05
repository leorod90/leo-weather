import React from 'react';
import {Animated} from 'react-native';

interface Props {
  index: number;
  active: number;
  children: React.ReactNode;
}

export default function DelayAnimations({index, active, children}: Props) {
  const startScale = 0;
  const endScale = 1;
  const speed = 800;
  const delay = index * 200 - index + 1 * 150;
  const delay2 = index * 5;

  const animValue = React.useRef(new Animated.Value(startScale)).current;
  const animation = () => {
    Animated.timing(animValue, {
      delay: delay,
      toValue: endScale,
      duration: speed,
      useNativeDriver: true,
    }).start();
  };
  const animationTwo = () => {
    Animated.timing(animValue, {
      delay: delay2,
      toValue: 0,
      duration: speed,
      useNativeDriver: true,
    }).start();
  };
  if (active === 1) {
    animation();
  }
  if (active === 0) {
    animationTwo();
  }

  // React.useEffect(() => {
  //   const animation = () => {
  //     Animated.timing(animValue, {
  //       delay: delay,
  //       toValue: endScale,
  //       duration: speed,
  //       useNativeDriver: true,
  //     }).start();
  //   };
  //   animation();
  // }, [animValue, active]);

  return (
    <Animated.View
      style={[
        {
          opacity: animValue,
          transform: [{scale: animValue}],
        },
      ]}>
      {children}
    </Animated.View>
  );
}
