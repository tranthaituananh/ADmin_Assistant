import React from "react"
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native"

export default function SignIn() {
  return (
    <View style={styles.SignIn}>
      <View style={styles.Group1053}>
        <Text style={styles.Txt526}>Welcome Back!</Text>
        <View style={styles.Input}>
          <Text style={styles.Txt365}>Email</Text>
        </View>
        <View style={styles.Input2}>
          <View style={styles.Input1}>
            <Text style={styles.Txt365}>Password</Text>
          </View>
        </View>
        <Text style={styles.multiple1}>Forgot Password? Click Here</Text>
        <View style={styles.Button}>
          <Text style={styles.Txt1071}>Sign In</Text>
        </View>
        <Text style={styles.multiple2}>Don’t have an account? Sign Up</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  SignIn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 178,
    paddingBottom: 161,
    paddingLeft: 17,
    paddingRight: 16,
    backgroundColor: "rgba(41,47,63,1)",
    shadowColor: "rgba(24,48,63,0.5)",
    elevation: 10,
    shadowOffset: { width: 40, height: 40 },
    width: 411,
    height: 823,
  },
  Group1053: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  Txt526: {
    fontSize: 32,
    fontFamily: "Poppins, sans-serif",
    fontWeight: "600",
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    justifyContent: "center",
    width: 376,
    marginBottom: 100,
  },
  Input: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 10,
    paddingBottom: 13.62,
    paddingLeft: 10,
    paddingRight: 313.58,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  Txt365: {
    fontSize: 13,
    fontFamily: "Poppins, sans-serif",
    fontWeight: "200",
    color: "rgba(0,0,0,0.74)",
  },

  Input2: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 15,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginBottom: 101,
  },
  Input1: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 10,
    paddingBottom: 13,
    paddingLeft: 10,
    paddingRight: 287,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  Txt365: {
    fontSize: 13,
    fontFamily: "Poppins, sans-serif",
    fontWeight: "200",
    color: "rgba(0,0,0,0.74)",
  },

  multiple1: {
    main: "Txt464",
    seg1: "[object Object]",
    seg2: "[object Object]",
    seg3: "[object Object]",
  },
  Button: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 7,
    paddingBottom: 11,
    paddingLeft: 32,
    paddingRight: 32.15,
    marginBottom: 28,
    borderRadius: 13.06,
    backgroundColor: "rgba(0,172,131,1)",
  },
  Txt1071: {
    fontSize: 14,
    fontFamily: "Poppins, sans-serif",
    fontWeight: "700",
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    justifyContent: "center",
    width: 146,
    height: 27,
  },

  multiple2: {
    main: "Txt8610",
    seg1: "[object Object]",
    seg2: "[object Object]",
    seg3: "[object Object]",
  },
})
