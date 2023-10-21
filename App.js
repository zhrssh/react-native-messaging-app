import { StyleSheet, Text, View } from "react-native";

import Status from "./src/components/Status";

export default function App() {
	return (
		<View style={styles.container}>
			<Status />
			<View style={styles.content}></View>
			<View style={styles.toolbar}>
				<Text>Toolbar</Text>
			</View>
			<View style={styles.inputMethodEditor}>
				<Text>IME</Text>
			</View>
		</View>
	);
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
});
