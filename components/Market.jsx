import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import ListItem from "./ListItem";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import { SAMPLE_DATA } from "../assets/data/sampleData";
import { useMemo, useRef } from "react";
import Chart from "./Chart";
import { getMarketData } from "./services/cryptoService";

const ListHeader = () => (
  <>
    <View style={styles.titleWrapper}>
      <Text style={styles.largeTitle}>Markets</Text>
    </View>
    <View style={styles.divider} />
  </>
);

const Market = () => {
  const [data, setData] = useState([]);
  const [selectedCoinData, setSelectedCoinData] = useState(null);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("1d");

  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setData(marketData);
    };
    fetchMarketData();
  }, []);

  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ["55%"], []);

  const openModal = (item) => {
    setSelectedCoinData(item);
    bottomSheetModalRef.current?.present();
  };

  const handleTimePeriodChange = (timePeriod) => {
    setSelectedTimePeriod(timePeriod);
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={({ item }) => (
            <ListItem
              name={item.name}
              symbol={item.symbol}
              currentPrice={item.current_price}
              priceChangePercentage7d={
                item.price_change_percentage_7d_in_currency
              }
              logo={item.image}
              onPress={() => openModal(item)}
            />
          )}
          ListHeaderComponent={<ListHeader />}
        />
      </SafeAreaView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomSheet}
      >
        {selectedCoinData && selectedTimePeriod && (
          <Chart
            currentPrice={selectedCoinData.current_price}
            logo={selectedCoinData.image}
            name={selectedCoinData.name}
            priceChangePercentage7d={
              selectedCoinData.price_change_percentage_7d_in_currency
            }
            sparkline={
              selectedCoinData[
                `${selectedCoinData.id}_sparkline_in_${selectedTimePeriod}`
              ].price || []
            }
            symbol={selectedCoinData.symbol}
          />
        )}

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.timePeriodButton,
              selectedTimePeriod === "1d" && styles.activeTimePeriodButton,
            ]}
            onPress={() => handleTimePeriodChange("1d")}
          >
            <Text
              style={[
                styles.timePeriodButtonText,
                selectedTimePeriod === "1d" &&
                  styles.activeTimePeriodButtonText,
              ]}
            >
              1D
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.timePeriodButton,
              selectedTimePeriod === "7d" && styles.activeTimePeriodButton,
            ]}
            onPress={() => handleTimePeriodChange("7d")}
          >
            <Text
              style={[
                styles.timePeriodButtonText,
                selectedTimePeriod === "7d" &&
                  styles.activeTimePeriodButtonText,
              ]}
            >
              1W
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.timePeriodButton,
              selectedTimePeriod === "30d" && styles.activeTimePeriodButton,
            ]}
            onPress={() => handleTimePeriodChange("30d")}
          >
            <Text
              style={[
                styles.timePeriodButtonText,
                selectedTimePeriod === "30d" &&
                  styles.activeTimePeriodButtonText,
              ]}
            >
              1M
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.timePeriodButton,
              selectedTimePeriod === "365d" && styles.activeTimePeriodButton,
            ]}
            onPress={() => handleTimePeriodChange("365d")}
          >
            <Text
              style={[
                styles.timePeriodButtonText,
                selectedTimePeriod === "365d" &&
                  styles.activeTimePeriodButtonText,
              ]}
            >
              1Y
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.timePeriodButton,
              selectedTimePeriod === "5y" && styles.activeTimePeriodButton,
            ]}
            onPress={() => handleTimePeriodChange("5y")}
          >
            <Text
              style={[
                styles.timePeriodButtonText,
                selectedTimePeriod === "5y" &&
                  styles.activeTimePeriodButtonText,
              ]}
            >
              5Y
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  titleWrapper: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#A9ABB1",
    marginHorizontal: 16,
    marginTop: 16,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  timePeriodButton: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 448,
    borderWidth: 0,
    backgroundColor: "transparent",
  },
  activeTimePeriodButton: {
    backgroundColor: "#F2F2F2",
  },
  timePeriodButtonText: {
    fontSize: 16,
    color: "#A9ABB1",
  },
  activeTimePeriodButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default Market;
