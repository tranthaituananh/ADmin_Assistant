import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
  Keyboard,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Tts from 'react-native-tts';
import Slider from '@react-native-community/slider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type Props = {};
export default class ReadText extends Component<Props> {
  state = {
    voices: [],
    ttsStatus: 'initiliazing',
    selectedVoice: null,
    speechRate: 0.5,
    speechPitch: 1,
    text: '',
  };

  constructor(props) {
    super(props);
    Tts.addEventListener('tts-start', event =>
      this.setState({ttsStatus: 'started'}),
    );
    Tts.addEventListener('tts-finish', event =>
      this.setState({ttsStatus: 'finished'}),
    );
    Tts.addEventListener('tts-cancel', event =>
      this.setState({ttsStatus: 'cancelled'}),
    );
    Tts.setDefaultRate(this.state.speechRate);
    Tts.setDefaultPitch(this.state.speechPitch);
    Tts.getInitStatus().then(this.initTts);
  }

  componentWillUnmount() {
    Tts.removeAllListeners('tts-start');
    Tts.removeAllListeners('tts-finish');
    Tts.removeAllListeners('tts-cancel');
  }

  initTts = async () => {
    const voices = await Tts.voices();
    const availableVoices = voices
      .filter(v => !v.networkConnectionRequired && !v.notInstalled)
      .map(v => {
        return {id: v.id, name: v.name, language: v.language};
      });
    let selectedVoice = null;
    if (voices && voices.length > 0) {
      selectedVoice = voices[0].id;
      try {
        await Tts.setDefaultLanguage(voices[0].language);
      } catch (err) {
        // My Samsung S9 has always this error: "Language is not supported"
        console.log(`setDefaultLanguage error `, err);
      }
      await Tts.setDefaultVoice(voices[0].id);
      this.setState({
        voices: availableVoices,
        selectedVoice,
        ttsStatus: 'initialized',
      });
    } else {
      this.setState({ttsStatus: 'initialized'});
    }
  };

  readText = async () => {
    Tts.stop();
    Tts.speak(this.state.text);
  };

  setSpeechRate = async rate => {
    await Tts.setDefaultRate(rate);
    this.setState({speechRate: rate});
  };

  setSpeechPitch = async rate => {
    await Tts.setDefaultPitch(rate);
    this.setState({speechPitch: rate});
  };

  onVoicePress = async voice => {
    try {
      await Tts.setDefaultLanguage(voice.language);
    } catch (err) {
      // My Samsung S9 has always this error: "Language is not supported"
      console.log(`setDefaultLanguage error `, err);
    }
    await Tts.setDefaultVoice(voice.id);
    this.setState({selectedVoice: voice.id});
  };

  renderVoiceItem = ({item}) => {
    return (
      // <Button
      //   title={`${item.language} - ${item.name || item.id}`}
      //   color={this.state.selectedVoice === item.id ? undefined : '#969696'}
      //   onPress={() => this.onVoicePress(item)}
      // />
      <TouchableOpacity
        style={styles.btnLang}
        onPress={() => this.onVoicePress(item)}>
        <AntDesign
          name="sound"
          size={30}
          color={
            this.state.selectedVoice === item.id ? 'rgba(0,172,131,1)' : '#fff'
          }
        />
        <Text
          style={{
            color:
              this.state.selectedVoice === item.id
                ? 'rgba(0,172,131,1)'
                : '#fff',
            fontSize: 14,
            fontFamily: 'Helvetica, sans-serif',
            textAlign: 'center',
            paddingLeft: 5,
            paddingTop: 3,
            alignItems: 'center',
          }}>
          {item.language}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.grpTitleView}>
          <Image
            style={styles.avatar}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/38v5caacm9d-388%3A132?alt=media&token=a3d24d05-a29e-4d41-9c65-394308556e94',
            }}
          />
          <Text style={styles.userName}>ADmin Assistant</Text>
        </View>

        {/* <Text style={styles.label}>{`Status: ${
          this.state.ttsStatus || ''
        }`}</Text>

        <Text style={styles.label}>{`Selected Voice: ${
          this.state.selectedVoice || ''
        }`}</Text> */}

        <View style={{flexDirection: 'row'}}>
          <FlatList
            keyExtractor={item => item.id}
            renderItem={this.renderVoiceItem}
            extraData={this.state.selectedVoice}
            data={this.state.voices}
          />
        </View>

        <TextInput
          placeholder="Write something..."
          placeholderTextColor={'rgba(255, 255, 255, 0.55)'}
          style={styles.textInput}
          multiline={true}
          onChangeText={text => this.setState({text})}
          value={this.state.text}
          onSubmitEditing={Keyboard.dismiss}
        />

        <View style={{alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={this.readText} style={styles.btnRead}>
            <Ionicons name="book-sharp" size={30} color="#fff" />
            <Text style={styles.btnText}>Read</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sliderContainer}>
          <Text
            style={styles.sliderLabel}>{`Speed: ${this.state.speechRate.toFixed(
            2,
          )}`}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0.01}
            maximumValue={0.99}
            value={this.state.speechRate}
            onSlidingComplete={this.setSpeechRate}
          />
        </View>

        <View style={styles.sliderContainer}>
          <Text
            style={
              styles.sliderLabel
            }>{`Pitch: ${this.state.speechPitch.toFixed(2)}`}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0.5}
            maximumValue={2}
            value={this.state.speechPitch}
            onSlidingComplete={this.setSpeechPitch}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //display: "flex",
    flexDirection: 'column',
    justifyContent: 'flex-start',
    //alignItems: 'center',
    padding: 7,
    backgroundColor: 'rgba(41,47,63,1)',
    shadowColor: 'rgba(24,48,63,0.5)',
    //elevation: 10,
    shadowOffset: {width: 40, height: 40},
    width: windowWidth,
    height: windowHeight,
  },
  grpTitleView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    //paddingTop: 5,
    width: '100%',
    height: '9%',
    justifyContent: 'flex-start',
    borderBottomWidth: 1 / 2,
    borderBottomColor: 'rgba(255, 255, 255, 0.4)',
    //backgroundColor: '#fff',
    //marginBottom: 623,
  },
  avatar: {
    width: '14%',
    height: '92%',
    //marginLeft: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 100,
    //marginRight: 114,
  },
  userName: {
    width: '86%',
    fontSize: 18,
    fontFamily: 'Roboto, sans-serif',
    fontWeight: '700',
    letterSpacing: 1,
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'right',
    justifyContent: 'flex-end',
    alignItems: 'center',
    //textTransform: 'capitalize',
  },
  label: {
    textAlign: 'center',
    color: '#fff',
  },
  sliderContainer: {
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderLabel: {
    textAlign: 'left',
    //marginRight: 10,
    color: '#fff',
    width: '25%',
  },
  slider: {
    width: '75%',
  },
  textInput: {
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderColor: 'gray',
    borderWidth: 1,
    //flex: 1,
    width: '100%',
    color: '#fff',
    textAlign: 'left',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    //padding: 5,
    fontSize: 14,
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: '400',
    marginTop: '10%',
  },
  btnRead: {
    justifyContent: 'center',
    marginTop: '5%',
    alignItems: 'center',
    backgroundColor: 'rgba(0,172,131,1)',
    borderRadius: 10,
    height: 45,
    //width: '40%',
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
  },
  btnText: {
    fontSize: 18,
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: '700',
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#fff',
    paddingLeft: 5,
  },
  btnLang: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: '5%',
  },
});
