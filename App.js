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

//3rd party
type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      aspectRatio: 2,
      _isMounted: false,
      pan: new Animated.ValueXY(),
      showCircle1: false,
      showCircle2: false,
    };

    this._visibility = new Animated.Value(1);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.pan.x,
          dy: this.state.pan.y,
        },
      ]),
      onPanResponderRelease: (e, gesture) => {
        this.state.pan.setOffset({x: this.currentPanValue.x, y: this.currentPanValue.y});
        this.state.pan.setValue({x: 0, y: 0});
      },
    });
  }

  componentDidMount() {
    this.setState({ _isMounted: true });

    this.currentPanValue = {x: 0, y: 0};
    this.panListener = this.state.pan.addListener((value) => this.currentPanValue = value);
  }

  componentWillUnmount() {
    this.setState({ _isMounted: false });

    this.state.pan.removeListener(this.panListener);
  }

  takeViewShot() {
    this.viewShot.capture().then(uri => {
      const modificationDate = new Date().getTime();
      Image.getSize(uri, (width, height) => {
        this.setState({
          finalImage: {
            uri: uri,
            width: width,
            height: height
          }
          })
      });
    });
}

  render() {

    const { style } = this.props;
    const { finalImage, loaded } = this.state;

    const transition = {
      opacity: this._visibility,
    };

    const doggieSource = 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80';
    const imagieUrl = this.state.finalImage ? this.state.finalImage.uri : null;

    return (
      <View style={styles.container}>
      { !finalImage && (
        <View>
        <ViewShot
          style={{ flex: null, width: '100%', height: 400 }}
          ref={ref => {
            this.viewShot = ref;
          }}
          options={{ format: 'jpg', quality: 1.0 }}
        >

          <ImageBackground
            ref={image => (this.imageComponent = image)}
            source={{ uri: doggieSource }}
            style={styles.attachment}
          >
          { this.state.showCircle1 && (
            <Animated.View
              {...this.panResponder.panHandlers}
              style={[this.state.pan.getLayout(), styles2.circle]}
            >
              <Text style={styles2.text}>1 month!</Text>
            </Animated.View>
          )}
          </ImageBackground>
          <View>
            <Text>Select a sticker</Text>
            <TouchableOpacity onPress={() => this.setState({showCircle1: true})}>
              <Text style={{color:'blue'}}>A circle!</Text>
            </TouchableOpacity>
          </View>
          </ViewShot>
          <TouchableOpacity onPress={() => this.takeViewShot()}>
            <Text style={{color:'blue'}}>TAKE A PIC!</Text>
          </TouchableOpacity>
        </View>
        )}

        {finalImage && (
          <View>
            <Text>Here's your final image!!</Text>
            <Text>{imagieUrl}</Text>
            <Image source={require(imagieUrl)}  />
          </View>
        )}
      </View>
    );
  }
}

let Window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  attachment: {
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
});

let CIRCLE_RADIUS = 36;
let styles2 = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  dropZone: {
    height: 100,
    backgroundColor: '#2c3e50',
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
    color: '#fff',
  },
  draggableContainer: {
    position: 'absolute',
    top: Window.height / 2 - CIRCLE_RADIUS,
    left: Window.width / 2 - CIRCLE_RADIUS,
  },
  circle: {
    backgroundColor: '#1abc9c',
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
  },
});
