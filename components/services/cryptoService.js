import axios from "axios";
import { db } from "../firebase-config.js";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const pricesCollectionRef = collection(db, "prices");
const specificDocumentRef = doc(db, "prices", "tLaJJJXFbkJbP3DGp45a");

const formatSparkline = (numbers) => {
  const formattedSparkline = numbers.map((item) => {
    return {
      x: item[0],
      y: item[1],
    };
  });

  return formattedSparkline;
};

const fetchSparklineData = async (coinId, days) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
  );
  const data = response.data;
  return formatSparkline(data.prices);
};

const formatMarketData = async (data) => {
  let formattedData = [];

  for (const item of data) {
    const {
      id,
      sparkline_in_7d,
      sparkline_in_30d,
      sparkline_in_1d,
      sparkline_in_365d,
      sparkline_in_5y,
    } = item;

    const bitcoin_sparkline_in_7d = {
      price: await fetchSparklineData("bitcoin", 7),
    };
    const bitcoin_sparkline_in_30d = {
      price: await fetchSparklineData("bitcoin", 30),
    };
    const bitcoin_sparkline_in_1d = {
      price: await fetchSparklineData("bitcoin", 1),
    };
    const bitcoin_sparkline_in_365d = {
      price: await fetchSparklineData("bitcoin", 365),
    };
    const bitcoin_sparkline_in_5y = {
      price: await fetchSparklineData("bitcoin", 1825),
    };

    const ethereum_sparkline_in_7d = {
      price: await fetchSparklineData("ethereum", 7),
    };
    const ethereum_sparkline_in_30d = {
      price: await fetchSparklineData("ethereum", 30),
    };
    const ethereum_sparkline_in_1d = {
      price: await fetchSparklineData("ethereum", 1),
    };
    const ethereum_sparkline_in_365d = {
      price: await fetchSparklineData("ethereum", 365),
    };
    const ethereum_sparkline_in_5y = {
      price: await fetchSparklineData("ethereum", 1825),
    };

    const formattedItem = {
      ...item,
      bitcoin_sparkline_in_7d,
      bitcoin_sparkline_in_30d,
      bitcoin_sparkline_in_1d,
      bitcoin_sparkline_in_365d,
      bitcoin_sparkline_in_5y,
      ethereum_sparkline_in_7d,
      ethereum_sparkline_in_30d,
      ethereum_sparkline_in_1d,
      ethereum_sparkline_in_365d,
      ethereum_sparkline_in_5y,
    };

    formattedData.push(formattedItem);
  }

  return formattedData;
};

let isUpdatingPrices = false;

const getMarketDataInit = async () => {
  if (isUpdatingPrices) {
    console.log("Update already in progress");
    return;
  }

  isUpdatingPrices = true;

  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=2&page=1&sparkline=true&price_change_percentage=7d"
    );
    const data = response.data;
    const formattedResponse = await formatMarketData(data);

    const updatePrices = async () => {
      try {
        await setDoc(specificDocumentRef, { formattedResponse });
        console.log("Firebase updated");
      } catch (e) {
        console.log("Error:", e);
      }
    };

    await updatePrices();
  } catch (error) {
    console.log("error: ", error.message);
  }

  isUpdatingPrices = false;
};

setInterval(getMarketDataInit, 100000);

export const getMarketData = async () => {
  const retrievePrices = async () => {
    try {
      const data = await getDocs(pricesCollectionRef);
      return data.docs
        .map((doc) => {
          const docData = doc.data().formattedResponse;
          return docData.map((item) => ({
            ...item,
          }));
        })
        .flat();
    } catch (e) {
      console.log("Error:", e);
    }
  };

  const retrievedData = await retrievePrices();
  return retrievedData;
};
