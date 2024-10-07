import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Linking,
} from "react-native";
import { StatusBar } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, { useState, useEffect } from "react";
import axios from "axios";
export default function Index() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const shareViaWhatsapp = () => {
    const url = "whatsapp://send?link=" + item.link;
    Linking.openURL(url);
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@medium"
      )
      .then((response) => {
        setData(response.data.items);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  if (loading) {
    <ActivityIndicator size="large" color="blue" />;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightgrey",
      }}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <FlatList
        data={data}
        keyExtractor={(item) => item.guid.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              padding: 10,
              margin: 10,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
            onPress={() => Linking.openURL(item.link)}>
            <Text style={{ fontSize: 24, fontWeight: "600", color: "black" }}>
              {item.title}
            </Text>

            <Text style={{ fontSize: 14, color: "grey" }}>{item.pubDate}</Text>
            {/* <Text style={{ fontSize: 14, color: "grey" }}>{item.link}</Text> */}
            <Text
              style={{ fontSize: 10, color: "grey", alignSelf: "flex-end" }}>
              {item.author}
            </Text>
            <TouchableOpacity
              onPress={() => {
                const url = "whatsapp://send?text=" + item.link + "\n";
                // const url = "whatsapp://send?link=" + item.link;

                Linking.openURL(url);
              }}
              style={styles.socialButton}>
              <FontAwesome name="whatsapp" size={30} color="#5372F0" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  blogView: {
    width: "150%",
    height: 100,
    backgroundColor: "white",
    margin: 10,
  },
  socialButton: {
    width: 40,
    height: 40,
    alignSelf: "flex-end",
    borderWidth: 2,
    borderColor: "#5372F0",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
