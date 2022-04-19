import React from "react"
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native"

export default function Chat() {
  return (
    <View style={styles.Chat}>
      <View style={styles.Group138}>
        <View style={styles.Group869}>
          <Image
            style={styles.Group}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/38v5caacm9d-388%3A132?alt=media&token=a3d24d05-a29e-4d41-9c65-394308556e94",
            }}
          />
          <Text style={styles.Txt553}>Trần Thái Tuấn Anh</Text>
        </View>
        <View style={styles.Group142}>
          <View style={styles.Group567}>
            <Text style={styles.Txt719}>Write</Text>
          </View>
          <View style={styles.Group449}>
            <Image
              style={styles.MdiMicrophone}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/38v5caacm9d-388%3A136?alt=media&token=7fcbcd40-be32-4f1a-9000-0e1b124d3de2",
              }}
            />
          </View>
          <View style={styles.Group161}>
            <Image
              style={styles.Subtract}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/38v5caacm9d-388%3A113?alt=media&token=59ce58d5-54e1-4843-a1ff-6f53d2a75f8b",
              }}
            />
          </View>
        </View>
      </View>
      <Image
        style={styles.Group7}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/38v5caacm9d-388%3A119?alt=media&token=83d60199-0897-47d4-a189-83080290f804",
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  Chat: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    position: "relative",
    paddingTop: 50,
    paddingBottom: 63,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "rgba(41,47,63,1)",
    shadowColor: "rgba(24,48,63,0.5)",
    elevation: 10,
    shadowOffset: { width: 40, height: 40 },
    width: 411,
    height: 823,
  },
  Group138: {
    display: "flex",
    flexDirection: "column",
  },
  Group869: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 623,
  },
  Group: {
    width: 45,
    height: 45,
    marginRight: 114,
  },
  Txt553: {
    fontSize: 15,
    fontFamily: "Roboto, sans-serif",
    fontWeight: "400",
    letterSpacing: 1,
    color: "rgba(255, 255, 255, 1)",
    textAlign: "right",
    justifyContent: "flex-end",
    textTransform: "capitalize",
  },

  Group142: {
    display: "flex",
    flexDirection: "row",
  },
  Group567: {
    paddingTop: 10,
    paddingBottom: 11,
    paddingLeft: 22,
    paddingRight: 195,
    marginRight: 7,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.25)",
    width: 255,
    height: 40,
  },
  Txt719: {
    fontSize: 14,
    fontFamily: "Helvetica, sans-serif",
    fontWeight: "400",
    letterSpacing: 1,
    color: "rgba(255, 255, 255, 0.6)",
    width: 36,
    height: 17,
  },

  Group449: {
    paddingTop: 11,
    paddingBottom: 11,
    paddingLeft: 11,
    paddingRight: 12,
    marginRight: 7,
    borderRadius: 10,
    backgroundColor: "rgba(0,172,131,1)",
    width: 40,
    height: 40,
  },
  MdiMicrophone: {
    width: 15,
    height: 16,
  },

  Group161: {
    paddingTop: 11,
    paddingBottom: 11,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    backgroundColor: "rgba(0,172,131,1)",
    width: 40,
    height: 40,
  },
  Subtract: {
    width: 18,
    height: 16,
  },

  Group7: {
    position: "absolute",
    top: 719,
    left: 246,
    width: 40,
    height: 40,
  },
})
