import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import Keypad from "./keypad";
import DeleteButton from "./delete-button";
import DropdownMenu from "./dropdown-menu";
import ConfirmButton from "./confirm-button";

const BuyComponent = () => {
  const [number, setNumber] = useState("");
  const [selectedItem, setSelectedItem] = useState("cbdc");
  const [price, setPrice] = useState(null);
  const [items, setItems] = useState([]);
  const [amount, setAmount] = useState(0);
  const [puchaseAmount, setPurchasedAmount] = useState(0);

  const handlePress = (num) => {
    setNumber(number + num.toString());
    setAmount(number + num.toString());
  };

  const handleDelete = () => {
    setNumber(number.slice(0, -1));
    setAmount(number.slice(0, -1));
  };

  useEffect(() => {
    const fetchPrices = async () => {
      let response;
      let data;
      let prices = {};

      // Set default price of CBDC to 1
      prices.cbdc = 1;

      try {
        // Fetch prices for Bitcoin and Ethereum
        response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
        );
        data = await response.json();
        prices = {
          ...prices,
          bitcoin: data.bitcoin.usd,
          ethereum: data.ethereum.usd,
        };
      } catch (error) {
        console.error("Error fetching Bitcoin and Ethereum prices", error);
      }

      try {
        // Fetch price of Gold from goldapi.io
        response = await fetch("https://www.goldapi.io/api/XAU/USD", {
          headers: {
            "x-access-token": "goldapi-uyx7qrlhc414zy-io",
            "Content-Type": "application/json",
          },
        });
        data = await response.json();
        prices.gold = data.price;
      } catch (error) {
        console.error("Error fetching gold price", error);
      }

      try {
        // Fetch price of Silver from goldapi.io
        response = await fetch("https://www.goldapi.io/api/XAG/USD", {
          headers: {
            "x-access-token": "goldapi-uyx7qrlhc414zy-io",
            "Content-Type": "application/json",
          },
        });
        data = await response.json();
        prices.silver = data.price;
      } catch (error) {
        console.error("Error fetching silver price", error);
      }

      // Set the price state for the selected item
      setPrice(prices[selectedItem]);
    };

    fetchPrices();
  }, [selectedItem]);

  useEffect(() => {
    // Set the items for the dropdown menu
    setItems([
      { label: "CBDC", value: "cbdc" },
      { label: "Bitcoin", value: "bitcoin" },
      { label: "Ethereum", value: "ethereum" },
      { label: "Gold", value: "gold" },
      { label: "Silver", value: "silver" },
    ]);
  }, []);

  const handleConfirm = () => {
    const amountInSelectedCurrency = (amount / price).toFixed(3);
    setPurchasedAmount(amountInSelectedCurrency);
    alert(
      `Congratulations, you have just bought ${amountInSelectedCurrency} ${selectedItem.toUpperCase()}!`
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {number.length > 0 && (
          <>
            <Text style={styles.headerText}>$ {number}</Text>
            <View style={styles.headerRight}>
              <DeleteButton handleDelete={handleDelete} />
            </View>
          </>
        )}
      </View>
      <View style={styles.dropdownContainer}>
        <DropdownMenu
          items={items}
          selectedValue={selectedItem}
          setSelectedValue={setSelectedItem}
        />
      </View>
      {price !== null && (
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>
            Current price of{" "}
            {selectedItem.charAt(0).toUpperCase() + selectedItem.slice(1)} is $
            {price.toFixed(2)}
          </Text>
        </View>
      )}
      <View style={styles.amountContainer}>
        <Text style={styles.convertedAmountText}>
          You are buying {(amount / price).toFixed(3)}{" "}
          {selectedItem.toUpperCase()}
        </Text>
      </View>

      <Keypad handlePress={handlePress} />
      <ConfirmButton handlePress={handleConfirm} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: "auto",
    paddingLeft: 90,
  },

  headerRight: {
    marginLeft: "auto",
    marginRight: 50,
  },

  dropdownContainer: {
    width: "80%",
    marginBottom: 50,
    zIndex: 2,
  },
  priceContainer: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  amountContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  amountLabel: {
    fontSize: 18,
    marginRight: 10,
  },
  amountValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default BuyComponent;
