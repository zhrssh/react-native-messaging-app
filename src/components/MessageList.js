import React from "react";
import PropTypes from "prop-types";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

import { MessageShape } from "../utils/MessageUtils.js";

const keyExtractor = (item) => item.id.toString();

export default class MessageList extends React.Component {
  static propTypes = {
    messages: PropTypes.arrayOf(MessageShape).isRequired,
    onPressMessage: PropTypes.func,
  };

  static defaultProps = {
    onPressMessage: () => {},
  };

  renderMessageItem = ({ item }) => {
    const { onPressMessage } = this.props;
    return (
      <View key={item.id} style={styles.messageRow}>
        <TouchableOpacity onPress={() => onPressMessage(item)}>
          {this.renderMessageBody(item)}
        </TouchableOpacity>
      </View>
    );
  };

  renderMessageBody = ({ type, text, uri, coordinate }) => {
    switch (type) {
      case "text":
        return (
          <View style={styles.messageBubble}>
            <Text style={styles.text}>{text}</Text>
          </View>
        );

      case "image":
        return <Image style={styles.image} source={{ uri }} />;

      case "location":
        if (coordinate) {
          return (
            <View style={styles.messageRow}>
              <View style={styles.mapContainer}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    ...coordinate,
                    latitudeDelta: 0.08,
                    longitudeDelta: 0.04,
                  }}>
                  <Marker coordinate={coordinate} />
                </MapView>
              </View>
            </View>
          );
        } else {
          return (
            <Text style={styles.locationText}>Location data is missing</Text>
          );
        }

      default:
        return null;
    }
  };

  render() {
    const { messages } = this.props;
    return (
      <FlatList
        style={StyleSheet.container}
        inverted
        data={messages}
        renderItem={this.renderMessageItem}
        keyExtractor={keyExtractor}
        keyboardShouldPersistTaps={"handled"}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "visible", // Prevents clipping on resize!
  },
  messageRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginLeft: 60,
    marginBottom: 8,
  },
  messageBubble: {
    backgroundColor: "blue",
    borderRadius: 99999,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 8,
  },
  mapContainer: {
    height: 200,
    width: 200,
    borderRadius: 8,
    overflow: "hidden",
  },
  map: {
    flex: 1,
    borderRadius: 8,
  },
});
