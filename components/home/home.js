import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import { data } from "../data/user-data";

const Home = () => {
  const { username, avatar, qrCode, charts, portfolio, coins } = data;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Standard Gold & Silver</Text>
        <View style={styles.spaceBetween}></View>
      </View>
      <View style={styles.usernameAvatarQrCode}>
        <View style={styles.usernameAlignment}>
          <Image
            style={styles.avatar}
            source={{ uri: avatar }}
            borderRadius={50}
            borderColor="#000"
            borderWidth={1}
          />
          <Text style={styles.username}>{username}</Text>
        </View>
        <View>
          <Image style={styles.qrCode} source={{ uri: data.qrCode }} />
        </View>
      </View>
      <View style={styles.charts}>
        {charts.map((chart, index) => (
          <View style={styles.chart} key={index}>
            <Text style={styles.chartText}>{chart}</Text>
          </View>
        ))}
      </View>
      <View style={styles.portfolio}>
        <Text style={styles.coins}>{coins}</Text>
        {portfolio.map((asset, index) => (
          <Text style={styles.asset} key={index}>
            {asset}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 50,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  spaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 1,
    paddingHorizontal: 20,
    width: "100%",
  },
  qrCode: {
    width: 50,
    height: 50,
  },
  usernameAvatarQrCode: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    width: "100%",
    borderTopColor: "black",
    borderTopWidth: 1,
  },
  usernameAlignment: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontSize: 16,
    marginLeft: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: "#000",
    borderWidth: 1,
  },
  charts: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  chart: {
    marginTop: 20,
    height: "33%",
    backgroundColor: "grey",
  },
  chartText: {
    fontSize: 16,
    textAlign: "center",
  },
  portfolio: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  asset: {
    fontSize: 16,
    margin: 8,
  },
  coins: {
    fontSize: 16,
  },
});

export default Home;
