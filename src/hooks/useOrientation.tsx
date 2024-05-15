import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

// checks if the device is in portrait or landscape mode
const useOrientation = () => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [orientation, setOrientation] = useState(
    windowWidth < windowHeight ? "PORTRAIT" : "LANDSCAPE"
  );

  const changeOrientationHandler = ({
    window: { width, height },
  }: {
    window: { width: number; height: number };
  }) => {
    if (width < height) {
      setOrientation("PORTRAIT");
    } else {
      setOrientation("LANDSCAPE");
    }
  };

  useEffect(() => {
    const dimensionsChangeListener = Dimensions.addEventListener(
      "change",
      changeOrientationHandler
    );

    return () => {
      dimensionsChangeListener.remove();
    };
  }, []);

  return orientation;
};

export default useOrientation;
