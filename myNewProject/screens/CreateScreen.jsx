import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  useWindowDimensions,
  TextInput,
  Keyboard,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCameraPermission,
  selectLocationPermission,
} from '../redux/permissions/permissionsSelectors';
import { createPost } from '../redux/posts/postsSlice';
import { selectAuthUserID } from '../redux/auth/authSelectors';
import CameraButton from '../reusableComponents/CameraButton';
import LocationButton from '../reusableComponents/LocationButton';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config';
const storage = getStorage();

const initialState = {
  title: '',
  location: '',
  photo: null,
  coords: null,
};

function CreateScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const userID = useSelector(selectAuthUserID);
  const cameraPermission = useSelector(selectCameraPermission);
  const locationPermission = useSelector(selectLocationPermission);
  const [camera, setCamera] = useState(null);
  const { width } = useWindowDimensions();
  const height = Math.round(((width - 32) * 4) / 3);
  const dispatch = useDispatch();

  const uploadFileToStorage = async () => {
    const res = await fetch(state.photo);
    const file = await res.blob();
    const storageRef = ref(
      storage,
      `postImages/${userID}/${state.coords.timestamp}`,
    );
    await uploadBytes(storageRef, file);
    const uri = await getDownloadURL(storageRef);
    return uri;
  };
  const publishPost = async () => {
    try {
      const uri = await uploadFileToStorage();

      const post = {
        postId: state.coords.timestamp,
        title: state.title,
        location: state.location,
        coords: state.coords,
        uri,
        comments: [],
      };

      const docRef = doc(db, 'posts', userID, state.coords.timestamp);
      await setDoc(docRef, post);
    } catch (error) {
      console.log(error.message);
    }
    dispatch(createPost({ ...state }));
    setState(initialState);
    navigation.navigate('PostsScreen');
  };
  const keyboardHide = () => {
    Keyboard.dismiss();
  };
  const takePhoto = async () => {
    const photo = await cameraRef.takePictureAsync();
    setState(prevState => {
      return { ...prevState, photo: photo.uri };
    });
    const location = await Location.getLastKnownPositionAsync();
    setState(prevState => {
      return {
        ...prevState,
        coords: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          timestamp: location.timestamp,
        },
      };
    });
  };

  if (cameraPermission === null || locationPermission === null) {
    return <View />;
  }
  if (cameraPermission === false || locationPermission === null) {
    return <Text>Need a permission to use camera/location</Text>;
  }
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAvoidingView
        style={{ flex: 1, paddingBottom: 50 }}
        keyboardVerticalOffset={0}
        behavior={'position'}
      >
        <View
          style={{
            position: 'relative',
            height: 240,
            width: Math.round(width) - 32,
            marginTop: 32,
            marginHorizontal: 16,
            borderRadius: 8,
            overflow: 'hidden',
            marginBottom: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Camera
            ratio="4:3"
            style={{ ...styles.camera, height, width: Math.round(width) - 32 }}
            ref={setCamera}
          >
            <TouchableOpacity
              style={{ width: '100%', height: '100%' }}
              onPress={keyboardHide}
            ></TouchableOpacity>
          </Camera>
          {state.photo && (
            <Image
              source={{ uri: state.photo }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            />
          )}
          <View style={styles.btnContainer}>
            {state.photo ? (
              <TouchableOpacity
                style={styles.btnSvg}
                onPress={() =>
                  setState(prevState => {
                    return { ...prevState, photo: '' };
                  })
                }
              >
                <View
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 70,
                    backgroundColor: '#E8E8E8',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.5,
                  }}
                >
                  <Text style={styles.plus}>+</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.btnSvg} onPress={takePhoto}>
                <CameraButton />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.InputGroup}>
          <TextInput
            value={state.title}
            onChangeText={value =>
              setState(prevState => ({ ...prevState, title: value }))
            }
            placeholder="Title"
            style={styles.input}
          />
          <TextInput
            value={state.location}
            onChangeText={value =>
              setState(prevState => ({ ...prevState, location: value }))
            }
            placeholder="Location"
            style={styles.input}
          />
          <View style={styles.locationIcon}>
            <LocationButton />
          </View>
        </View>
        <TouchableOpacity
          disabled={
            !state.photo || !state.coords || !state.location || !state.title
          }
          activeOpacity={0.8}
          style={{
            ...styles.btn,
            backgroundColor:
              !state.photo || !state.coords || !state.location || !state.title
                ? '#A0A0A0'
                : '#FF6C00',
          }}
          onPress={publishPost}
        >
          <Text style={styles.textBtn}>Publish Post</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  cameraWrp: {},
  camera: {},
  photoView: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  plus: {
    fontSize: 30,
    fontWeight: '300',
  },
  input: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E8E8E8',
    paddingLeft: 30,
    marginHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
    fontFamily: 'Roboto',
    fontWeight: '400',
  },
  btn: {
    borderRadius: 100,
    height: 51,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  InputGroup: {
    position: 'relative',
  },
  locationIcon: {
    position: 'absolute',
    bottom: 28,
    left: 22,
  },
});

export default CreateScreen;
