import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import axios from "axios";

const YahooApp = () => {
  const [stockData, setStockData] = useState(null);

  const fetchStockData = async () => {
    const apiKey = process.env.YAHOO_FINANCE_API_KEY;
    const symbol = "AAPL";
    const url = `https://query1.finance.yahoo.com/v1/finance/quoteSummary?symbols=${symbol}&format=json&includeRelated=true`;
    const response = await axios.get(url, {
      params: {
        apiKey,
      },
    });
    setStockData(response.data);
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  if (!stockData) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Yahoo Finance</Text>
      <ScrollView>
        <View style={styles.stock}>
          <Text style={styles.stockName}>{stockData.quoteSummary.symbol}</Text>
          <Text style={styles.stockPrice}>{stockData.quoteSummary.price}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  stock: {
    margin: 10,
  },
  stockName: {
    fontSize: 16,
  },
  stockPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default YahooApp;
