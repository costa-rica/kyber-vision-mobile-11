import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Polygon, Svg, Circle } from "react-native-svg";
import { useState, useEffect } from "react";

export default function SwipePad(props) {
  // console.log(" SWIPE PAD: are we called?");
  //const circleRadius = props.circleRadiusOuter; // Radius of the circle
  const cx = props.circleRadiusMiddle; // Center x-coordinate
  const cy = props.circleRadiusMiddle; // Center y-coordinate
  //const numTrianglesMiddle = props.numTrianglesMiddle; // Number of triangles
  const numTrianglesOuter = props.numTrianglesOuter;
  const extensionFactor = 1.5; // Extend triangle base 10% beyond the circle
  // Generate triangle points for each triangle
  const trianglesMiddle = Array.from({ length: props.numTrianglesMiddle }).map(
    (_, index) => {
      const cx = props.circleRadiusMiddle; // Center x-coordinate
      const cy = props.circleRadiusMiddle; // Center y-coordinate
      const angle = (index * 360) / props.numTrianglesMiddle; // Divide circle into 8 parts
      const rad = (Math.PI / 180) * angle; // Convert to radians

      // Extended base points beyond the circle
      const base1X =
        cx + props.circleRadiusMiddle * extensionFactor * Math.cos(rad);
      const base1Y =
        cy + props.circleRadiusMiddle * extensionFactor * Math.sin(rad);

      const base2X =
        cx +
        props.circleRadiusMiddle *
          extensionFactor *
          Math.cos(rad + Math.PI / (props.numTrianglesMiddle / 2)); // x degrees in radians
      const base2Y =
        cy +
        props.circleRadiusMiddle *
          extensionFactor *
          Math.sin(rad + Math.PI / (props.numTrianglesMiddle / 2));

      // Apex point in the center
      const apexX = cx;
      const apexY = cy;

      // Create points string for Polygon
      return `${apexX},${apexY} ${base1X},${base1Y} ${base2X},${base2Y}`;
    }
  );
  const trianglesOuter = Array.from({ length: numTrianglesOuter }).map(
    (_, index) => {
      const cx = props.circleRadiusOuter; // Center x-coordinate
      const cy = props.circleRadiusOuter; // Center y-coordinate
      const angle = (index * 360) / numTrianglesOuter; // Divide circle into 8 parts
      const rad = (Math.PI / 180) * angle; // Convert to radians

      // Extended base points beyond the circle
      const base1X =
        cx + props.circleRadiusOuter * extensionFactor * Math.cos(rad);
      const base1Y =
        cy + props.circleRadiusOuter * extensionFactor * Math.sin(rad);

      const base2X =
        cx +
        props.circleRadiusOuter *
          extensionFactor *
          Math.cos(rad + Math.PI / (numTrianglesOuter / 2)); // x degrees in radians
      const base2Y =
        cy +
        props.circleRadiusOuter *
          extensionFactor *
          Math.sin(rad + Math.PI / (numTrianglesOuter / 2));

      // Apex point in the center
      const apexX = cx;
      const apexY = cy;

      // Create points string for Polygon
      return `${apexX},${apexY} ${base1X},${base1Y} ${base2X},${base2Y}`;
    }
  );

  const [rotateOuter, setRotateOuter] = useState(false);
  const [rotateMiddle, setRotateMiddle] = useState(false);
  useEffect(() => {
    console.log(
      `--> props.numTrianglesMiddle: ${props.numTrianglesMiddle}, props.numTrianglesOuter: ${props.numTrianglesOuter}`
    );
    if (props.numTrianglesMiddle === 5) {
      setRotateOuter(true);
      setRotateMiddle(false);
      // console.log("triggered rotateOuter");
    } else if (
      props.numTrianglesMiddle === 4 &&
      props.numTrianglesOuter == 12
    ) {
      setRotateOuter(true);
      setRotateMiddle(true);
    } else {
      setRotateOuter(false);
      setRotateMiddle(false);
    }
  }, [props.numTrianglesMiddle]);

  // console.log(`rotateOuter: ${rotateOuter}`);
  // // console.log(`props.numTrianglesOuter: ${props.numTrianglesOuter}`);
  // console.log(`props.numTrianglesMiddle: ${props.numTrianglesMiddle}`);
  const styleVwOuterSizeAndRotation = {
    width: props.circleRadiusOuter * 2,
    height: props.circleRadiusOuter * 2,
    borderRadius: props.circleRadiusOuter,
    overflow: "hidden",
    transform: [{ rotate: "-15deg" }],
    transform: [{ rotate: rotateOuter ? "-15deg" : "0deg" }],
    borderWidth: 1,
    borderColor: "black",
  };
  // ------ Middle Circle ------
  const styleVwMiddleCircle = {
    position: "absolute",
    width: props.circleRadiusMiddle * 2,
    height: props.circleRadiusMiddle * 2,
    top: props.circleRadiusOuter - props.circleRadiusMiddle,
    left: props.circleRadiusOuter - props.circleRadiusMiddle,
    borderRadius: props.circleRadiusMiddle,
    overflow: "hidden",
    borderWidth: 1,
    // transform: [{ rotate: rotateInner ? "-30deg" : "0deg" }],
    transform: [{ rotate: rotateMiddle ? "-30deg" : "0deg" }],
  };
  const styleCircleInner = {
    position: "absolute",
    top: props.circleRadiusMiddle - props.circleRadiusInner,
    left: props.circleRadiusMiddle - props.circleRadiusInner,
    height: props.circleRadiusInner * 2,
    width: props.circleRadiusInner * 2,
    // zIndex: 3,
  };
  // const sizeViewForTextMiddleCircle = 40
  const dictTextPoitions = {
    1: {
      right: props.circleRadiusOuter - props.circleRadiusMiddle * 1.2,
      bottom: props.circleRadiusOuter - props.circleRadiusMiddle / 2,
    },
    2: {
      right: props.circleRadiusOuter - props.circleRadiusMiddle / 2,
      bottom: props.circleRadiusOuter - props.circleRadiusMiddle * 1.2,
    },
    3: {
      right: props.circleRadiusOuter * 1.1,
      bottom: props.circleRadiusOuter - props.circleRadiusMiddle / 2,
    },
    4: {
      right: props.circleRadiusOuter - props.circleRadiusMiddle / 2,
      bottom: props.circleRadiusOuter * 1.1,
    },
  };

  return (
    // <View style={[props.styleVwMainPosition, styleVwOuter]}>
    <View style={props.styleVwMainPosition}>
      <View style={styleVwOuterSizeAndRotation}>
        <Svg
          height={props.circleRadiusOuter * 2}
          width={props.circleRadiusOuter * 2}
        >
          {trianglesOuter.map((points, index) => (
            <Polygon
              key={index}
              points={points}
              fill={props.swipeColorDict[1 + props.numTrianglesMiddle + index]} // 50% transparent blue
              // fill="transparent" // 50% transparent blue
              stroke="black" // Stroke color
              strokeWidth="1" // Thickness of the stroke
            />
          ))}
        </Svg>
        {/* ---- Middle Circle ---- */}
        <View style={styleVwMiddleCircle}>
          <Svg
            height={props.circleRadiusMiddle * 2}
            width={props.circleRadiusMiddle * 2}
          >
            {trianglesMiddle.map((points, index) => (
              <View
                key={index}
                style={{
                  // backgroundColor: "yellow",
                  width: props.circleRadiusMiddle + 5,
                  height: props.circleRadiusMiddle + 5,
                  // borderColor: "gray",
                  // borderStyle: "dashed",
                  // borderWidth: 1,
                }}
              >
                <Polygon
                  key={index}
                  points={points}
                  fill={props.swipeColorDict[index + 1]}
                  // fill="transparent" // 50% transparent blue
                  stroke="black" // Stroke color
                  strokeWidth="3" // Thickness of the stroke
                />
              </View>
            ))}
          </Svg>
          {/* ---- Inner circle ---- */}
          <Svg
            height={props.circleRadiusInner * 2}
            width={props.circleRadiusInner * 2}
            style={styleCircleInner}
          >
            <Circle
              cx={props.circleRadiusInner} // Centering horizontally (x coords w/ respect to parent <Svg/>)
              cy={props.circleRadiusInner} // Centering vertically (y coords w/ respect to parent <Svg/>)
              r={props.circleRadiusInner}
              // stroke="black"
              // strokeWidth="1"
              fill={props.swipeColorDict["center"]}
            />
          </Svg>
        </View>
      </View>
      {/* TEXT MIDDLE Circle */}
      {Array.from({ length: 4 }, (_, index) => (
        <View
          key={index}
          style={{
            position: "absolute",
            // transform: [{ rotate: "45deg" }],
            // right: index * props.circleRadiusMiddle,
            // bottom: 0,
            right: dictTextPoitions[index + 1].right,
            bottom: dictTextPoitions[index + 1].bottom,
            justifyContent: "center",
            alignItems: "center",
            width: props.circleRadiusMiddle,
            height: props.circleRadiusMiddle,
            // backgroundColor: "green",
            // zIndex: 99,
          }}
        >
          <Text
            key={index}
            style={{
              color: props.swipeTextStyleDict[index + 1].color,
              fontSize: props.swipeTextStyleDict[index + 1].fontSize,
              fontWeight: props.swipeTextStyleDict[index + 1].fontWeight,
              // transform: [{ rotate: "45deg" }],
            }}
          >
            {props.tableTypeDummyData[index]}
          </Text>
        </View>
      ))}
    </View>
  );
}
