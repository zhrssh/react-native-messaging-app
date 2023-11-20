import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Alert,
  TouchableHighlight,
  BackHandler,
  Image,
} from "react-native";
import React from "react";

import MessageList from "./src/components/MessageList.js";
import {
  createImageMessage,
  createLocationMessage,
  createTextMessage,
} from "./src/utils/MessageUtils.js";
import Status from "./src/components/Status.js";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      messages: [
        createImageMessage("https://unsplash.it/300/300"),
        createTextMessage("World"),
        createTextMessage("Hello"),
        createLocationMessage({
          latitude: 37.78825,
          longitude: -122.4324,
        }),
      ],
      fullScreenImageId: null,
    };
  }

  componentDidMount() {
    this.subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        const { fullScreenImageId } = this.state;
        if (fullScreenImageId) {
          this.dismissFullscreenImage();
          return true;
        }
        return false;
      }
    );
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  // Handles image viewing
  dismissFullscreenImage = () => {
    this.setState({ fullScreenImageId: null });
  };

  renderFullscreenImage = () => {
    const { messages, fullScreenImageId } = this.state;
    const { width, height } = Dimensions.get("window");

    if (!fullScreenImageId) return null;
    const image = messages.find((message) => message.id === fullScreenImageId);

    if (!image) return null;
    const { uri } = image;
    return (
      <TouchableHighlight
        style={{
          width,
          height,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "black",
        }}
        onPress={this.dismissFullscreenImage}>
        <Image style={styles.fullscreenImage} source={{ uri }} />
      </TouchableHighlight>
    );
  };

  // Handles the deletion of messages
  handleDeleteMessage = (messageId) => {
    const updatedMessages = this.state.messages.filter(
      (message) => message.id !== messageId
    );
    this.setState({ messages: updatedMessages });
  };

  // The alert dialog
  alert = (item) => {
    Alert.alert("Delete", "Do you want to delete this message?", [
      {
        text: "Delete",
        onPress: () => {
          this.handleDeleteMessage(item.id);
        },
      },
      {
        text: "Cancel",
      },
    ]);
  };

  // Handles message bubble function
  handlePressMessage = (item) => {
    switch (item.type) {
      case "text":
        this.alert(item);
        break;
      case "image":
        this.setState({ fullScreenImageId: item.id });
        break;
      default:
        break;
    }
  };

  renderMessageList() {
    const { messages } = this.state;

    return (
      <View style={styles.content}>
        <MessageList
          messages={messages}
          onPressMessage={this.handlePressMessage}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Status />
        {this.renderMessageList()}
        <View style={styles.toolbar}>
          <Text>Toolbar</Text>
        </View>
        <View style={styles.inputMethodEditor}>
          <Text>IME</Text>
        </View>
        {this.renderFullscreenImage()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.04)",
    backgroundColor: "#ffffff",
  },
  fullscreenImage: {
    resizeMode: "cover",
    flex: 1,
  },
});

export default App;
