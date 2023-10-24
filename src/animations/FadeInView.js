import React from "react";
import { Animated } from "react-native";

function FadeInView(props, ref) {
	const fadeAnim = React.useRef(new Animated.Value(0)).current;

	React.useEffect(function () {
		Animated.timing(
			fadeAnim,
			{
				toValue: 1,
				duration: 500,
				useNativeDriver: false,
			},
			[fadeAnim]
		).start(props.callback);
	});

	return (
		<>
			<Animated.View style={{ ...props.style, opacity: fadeAnim }}>
				{props.children}
			</Animated.View>
		</>
	);
}

export default React.forwardRef(FadeInView);
