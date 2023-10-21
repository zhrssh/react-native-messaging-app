import { Constants } from "expo";
import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import React from "react";

export default class Status extends React.Component {
	constructor() {
		super();
		this.state = {
			info: null,
		};

		this.getNetworkState = this.getNetworkState.bind(this);
	}

	getNetworkState(state) {
		return this.setState(() => ({
			info: state.type,
		}));
	}

	componentDidMount() {
		// Subscribe to the network status changes
		this.unsubscribe = NetInfo.addEventListener(this.getNetworkState);
	}

	componentWillUnmount() {
		// Unsubscribe to the network status changes
		this.unsubscribe();
	}

	render() {
		const { info } = this.state;

		const isConnected = !["none", "unknown"].includes(info);
		const backgroundColor = isConnected ? "white" : "red";
		const statusBar = (
			<StatusBar
				backgroundColor={backgroundColor}
				barStyle={isConnected ? "dark-content" : "light-content"}
				animated={false}
			/>
		);

		const messageContainer = (
			<View style={styles.messageContainer} pointerEvents={"none"}>
				{statusBar}
				{!isConnected && (
					<View style={styles.bubble}>
						<Text style={styles.text}>No network connection.</Text>
					</View>
				)}
			</View>
		);

		if (Platform.OS == "ios") {
			return (
				<View style={[styles.statusbar, { backgroundColor }]}>
					{messageContainer}
				</View>
			);
		}

		return messageContainer;
	}
}

const statusHeight = Platform.OS == "ios" ? Constants.statusBarHeight : 0;
const styles = StyleSheet.create({
	statusbar: {
		zIndex: 1,
		height: statusHeight,
	},
	messageContainer: {
		zIndex: 1,
		position: "absolute",
		top: statusHeight + 20,
		right: 0,
		left: 0,
		height: 80,
		alignItems: "center",
	},
	bubble: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 20,
		backgroundColor: "red",
	},
	text: {
		color: "white",
	},
});
