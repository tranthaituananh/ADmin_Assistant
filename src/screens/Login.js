import React from 'react';
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native";

export default function SignIn() {
  return (
    <View style={styles.SignIn}>
      <View style={styles.Group852}>
        <Text style={styles.Txt815}>Welcome Back!</Text>
        <View style={styles.Input}>
          <Text style={styles.Txt922}>Email</Text>
        </View>
        <Text style={styles.multiple1}>Forgot Password? Click Here</Text>
        <View style={styles.Button}>
          <Text style={styles.Txt971}>Sign In</Text>
        </View>
        <Text style={styles.multiple2}>Don’t have an account? Sign Up</Text>
      </View>
      <View style={styles.Input2}>
        <View style={styles.Input1}>
          <Text style={styles.Txt922}>Password</Text>
        </View>
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
    position: "relative",
    paddingTop: 178,
    paddingBottom: 177,
    paddingLeft: 0,
    paddingRight: 0,
    borderRadius: 40,
    backgroundColor: "rgba(41,47,63,1)",
    shadowColor: "rgba(24,48,63,0.5)",
    elevation: 10,
    shadowOffset: { width: 40, height: 40 },
    width: 375,
    height: 812,
  },
  Group852: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  Txt815: {
    fontSize: 32,
    fontFamily: "Poppins, sans-serif",
    fontWeight: "600",
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    justifyContent: "center",
    width: 376,
    marginBottom: 102,
  },
  Input: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 10,
    paddingBottom: 13,
    paddingLeft: 9,
    paddingRight: 283,
    marginBottom: 119,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  Txt922: {
    fontSize: 13,
    fontFamily: "Poppins, sans-serif",
    fontWeight: "200",
    color: "rgba(0,0,0,0.74)",
  },

  multiple1: {
    main: "Txt435",
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
  Txt971: {
    fontSize: 13.06,
    fontFamily: "Poppins, sans-serif",
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.98)",
    textAlign: "center",
    justifyContent: "center",
    width: 146,
    height: 27,
  },

  multiple2: {
    main: "Txt736",
    seg1: "[object Object]",
    seg2: "[object Object]",
    seg3: "[object Object]",
  },

  Input2: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    position: "absolute",
    top: 374,
    left: 20,
    paddingTop: 15,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    width: 329,
    height: 46,
  },
  Input1: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 10,
    paddingBottom: 13,
    paddingLeft: 9,
    paddingRight: 256,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  Txt922: {
    fontSize: 13,
    fontFamily: "Poppins, sans-serif",
    fontWeight: "200",
    color: "rgba(0,0,0,0.74)",
  },
})
