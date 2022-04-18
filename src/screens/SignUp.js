import React from "react"
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native"

export default function SignUp() {
  return (
    <View style={styles.SignUp}>
      <View style={styles.Group812}>
        <Text style={styles.Txt233}>Create Account</Text>
        <View style={styles.Input}>
          <Text style={styles.Txt575}>Full Name</Text>
        </View>
        <View style={styles.Input2}>
          <View style={styles.Input1}>
            <Text style={styles.Txt575}>Password</Text>
          </View>
        </View>
        <Text style={styles.multiple1}>
          I agree to the UNICEF Terms and Conditions
        </Text>
        <View style={styles.Button}>
          <Text style={styles.Txt836}>Sign Up</Text>
        </View>
        <Text style={styles.multiple2}>Already have an account? Sign In</Text>
      </View>
      <View style={styles.Input3}>
        <Text style={styles.Txt575}>Email</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  SignUp: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    position: "relative",
    paddingTop: 177,
    paddingBottom: 161,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: "rgba(41,47,63,1)",
    shadowColor: "rgba(24,48,63,0.5)",
    elevation: 10,
    shadowOffset: { width: 40, height: 40 },
    width: 411,
    height: 823,
  },
  Group812: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  Txt233: {
    fontSize: 32,
    fontFamily: "Poppins, sans-serif",
    fontWeight: "600",
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    justifyContent: "center",
    width: 412,
    marginBottom: 75,
  },
  Input: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 10,
    paddingBottom: 14,
    paddingLeft: 10,
    paddingRight: 287,
    marginBottom: 52,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  Txt575: {
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
    marginBottom: 76,
  },
  Input1: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 10,
    paddingBottom: 13,
    paddingLeft: 10,
    paddingRight: 291,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  Txt575: {
    fontSize: 13,
    fontFamily: "Poppins, sans-serif",
    fontWeight: "200",
    color: "rgba(0,0,0,0.74)",
  },

  multiple1: {
    main: "Txt648",
    seg1: "[object Object]",
    seg2: "[object Object]",
  },
  Button: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 7.35,
    paddingBottom: 11.35,
    paddingLeft: 32.35,
    paddingRight: 32.5,
    marginBottom: 28,
    borderRadius: 13.06,
    backgroundColor: "rgba(0,172,131,1)",
  },
  Txt836: {
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
    main: "Txt374",
    seg1: "[object Object]",
    seg2: "[object Object]",
    seg3: "[object Object]",
  },

  Input3: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    position: "absolute",
    top: "43.62%",
    bottom: "51.03%",
    left: "5.84%",
    right: "5.84%",
    paddingTop: 9,
    paddingBottom: 12,
    paddingLeft: 10,
    paddingRight: 316,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 1)",
    width: 363,
    height: 44,
  },
  Txt575: {
    fontSize: 13,
    fontFamily: "Poppins, sans-serif",
    fontWeight: "200",
    color: "rgba(0,0,0,0.74)",
  },
})