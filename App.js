/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import ViewShot from 'react-native-view-shot';

//Native
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  PanResponder,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

import { StickerPicker } from './src';

//3rd party
type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      pickerVisible: false,
    };
  }

  render() {
    const { style } = this.props;
    const { finalImage } = this.state;

    return (
      <View style={styles.container}>
      <Text style={styles.appTitle}>React Native Stickers</Text>
      {!finalImage && (
        <View>
          <TouchableOpacity onPress={() => this.setState({ pickerVisible: true })}>
            <Text>Add Sticker!</Text>
          </TouchableOpacity>
          <StickerPicker
            visible={this.state.pickerVisible}
            topContainer={<View style={{paddingTop: 60, paddingBottom: 40, textAlign: 'center', alignItem: 'center', justifyContent: 'center'}}><Text style={{alignSelf: 'center', fontSize: 18}}>Get stickering!</Text></View>}
            bottomContainer={<Text style={styles.actionTitle}>Save Picture</Text>}
            bottomContainerStyle={styles.bottomContainerStyle}
            completedEditing={(imageUri, width, height) => this.setState({ pickerVisible: false, finalImage: {imageUri, width, height} })}
            includeDefaultStickers={true}
            imageStyle={null}
            previewImageSize={50}
            stickerSize={100}
            imageSource={'https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'}
            stickers={null}
           />
          </View>
        )}
       {finalImage && (
         <View>
           <Image
             style={styles.finalAttachment}
             source={{uri: finalImage.imageUri}}
           />
           <TouchableOpacity
             onPress={() => this.setState({ pickerVisible: true, finalImage: false})}
            >
            <Text style={styles.actionTitle}>Do it again!</Text>
          </TouchableOpacity>
        </View>

        )}
      </View>
    );
  }
}

let Window = Dimensions.get('window');
let CIRCLE_RADIUS = 45;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  bottomContainerStyle: {
    height: 80
  },
  attachment: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    height: 500,
    width: Window.width,
  },
  actionTitle: {
    color:'blue',
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 20
  },
  stickerPickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: Window.width,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    width: Window.width,
    marginVertical: 5,
    fontSize: 20,
    textAlign: 'center'
  },
  appTitle: {
    width: Window.width,
    marginVertical: 25,
    fontSize: 25,
    textAlign: 'center'
  },
  finalAttachment: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    height: 500,
    width: Window.width,
  },
  activeIndicator: {
    opacity: 1,
  },
  inactiveIndicator: {
    opacity: 0,
  },
  text: {
    fontSize: 15,
    alignSelf: 'center',
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
    color: '#fff',
  },
  actionTitle: {
    color:'blue',
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 20
  },
  circle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    padding: 5,
    margin: 2,
    borderRadius: CIRCLE_RADIUS,
  },
});
