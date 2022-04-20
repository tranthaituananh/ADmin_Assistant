import React from "react"
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native"

export default function Voice() {
  return (
    <View style={styles.Voice}>
      <View style={styles.Group4710}>
        <Image
          style={styles.IconoirVoice}
          source={{ uri: "image unavailable" }}
        />
        <View style={styles.Group131}>
          <Image
            style={styles.MdiMicrophone}
            source={{ uri: "image unavailable" }}
          />
        </View>
      </View>
      <Image
        style={styles.IconoirVoice1}
        source={{ uri: "image unavailable" }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  Voice: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    position: "relative",
    paddingTop: 276,
    paddingBottom: 103,
    paddingLeft: 47,
    paddingRight: 82,
    backgroundColor: "rgba(41,47,63,1)",
    shadowColor: "rgba(24,48,63,0.5)",
    elevation: 10,
    shadowOffset: { width: 40, height: 40 },
    width: 411,
    height: 823,
  },
  Group4710: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  IconoirVoice: {
    width: 168,
    height: 200,
    marginBottom: 100,
    marginLeft: 15,
  },
  Group131: {
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 10,
    backgroundColor: "rgba(0,172,131,1)",
    width: 80,
    height: 80,
  },
  MdiMicrophone: {
    width: 30,
    height: 30,
  },

  IconoirVoice1: {
    position: "absolute",
    top: 277,
    left: 160,
    width: 168,
    height: 200,
  },
})
