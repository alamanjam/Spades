import React from 'react';
import {
  AsyncStorage,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import firebase from 'firebase';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import {Button, Icon, Card, Header} from 'react-native-elements';

import ClubScreen from '../screens/ClubScreen';

      var config = {
    apiKey: "AIzaSyDB8VXxMiqunnhG0lLpQxqQMwf8MVbOOsA",
    authDomain: "fir-test-72784.firebaseapp.com",
    databaseURL: "https://fir-test-72784.firebaseio.com",
    projectId: "fir-test-72784",
    storageBucket: "fir-test-72784.appspot.com",
    messagingSenderId: "752171087612"
  };
  firebase.initializeApp(config);

export default class HomeScreen extends React.Component {
  state = {
    isLoading: true,
    uniqname: "",
    clubs: ""
  };
  static navigationOptions = {
    header: <Header
        leftComponent={<Button icon=
        {<Icon name="menu" onPress={()=>{}}/>} size={15} color="transparent" type='clear'/>}
        centerComponent={<Image source={require('../assets/images/m_trans.png')} 
          style = {{width: 40,height: 40, resizeMode: 'contain'}}/>}
        rightComponent= {<Button title='Edit' titleStyle={{fontWeight: 'bold', color : 'black'}} type='clear'/>}
        backgroundImage={{uri: 'https://jssorcdn7.azureedge.net/demos/img/present/02.jpg'}}
        />
  }
    _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
  componentDidMount() {
    AsyncStorage.getItem('userToken').then((token) => {
      this.setState({
        uniqname: token
      });
      var userToken = this.state.uniqname;
    var usersRef = firebase.database().ref('/users/' + token);
    usersRef.once('value', (snapshot) => {
  this.setState({
    isLoading: false,
    clubs: snapshot.val().clubs
  })
});
    });
    
  };

x
  render() {
    const nav = this.props.navigation;
    if(this.state.isLoading)
    {
      return <Text>loading...</Text>;
    }
    console.log(this.state);
      var lmao = 
      <View style={styles.container}>
      
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} pagingEnabled = {true}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.getStartedText}>Welcome to Maize Pages App!</Text>
          </View>
          
          <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.cardContainer} onPress={() => nav.navigate('ClubScreen', {club: 'Michigan Hackers'})}>
            <Card image={{uri:"https://se-infra-imageserver2.azureedge.net/clink/images/d575c35c-d2e0-489d-8a8a-039b0b668c62c21bde67-05e1-4f6e-9e3d-0db57b682736.png?preset=med-sq"}}
              >
              <Text style={styles.cardTitle}>Michigan Hackers</Text>
            </Card>
          </TouchableOpacity>
          </View>
          <Button title = "sign out" onPress={this._signOutAsync}>
          </Button>
        </ScrollView>
      </View>
      return lmao;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardTitle:{
    fontSize: 18,
    fontFamily: 'SourceSansPro',
  },
  cardContainer:{
    flex: 0.5,
    aspectRatio: 1,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});


/*
  Commeneted out code from default template. Might be needed for future reference.
  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };   
}

//Styling stuff
  <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
    <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
  </View>
  <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
    <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
  </View>
*/