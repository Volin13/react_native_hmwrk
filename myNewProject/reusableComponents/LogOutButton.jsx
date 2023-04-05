import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { logOut } from '../redux/auth/authSlice';
import Svg, { Path } from 'react-native-svg';

const LogOutBtn = () => {
  const dispatch = useDispatch();
  const userLogOut = () => {
    dispatch(logOut());
  };
  return (
    <TouchableOpacity onPress={userLogOut} style={styles.container}>
      <Svg
        width={24}
        height={24}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M10 22H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h5M17 16l4-4-4-4M21 12H9"
          stroke="#BDBDBD"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
  },
});

export default LogOutBtn;
