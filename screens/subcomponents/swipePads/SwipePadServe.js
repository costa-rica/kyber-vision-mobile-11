import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Polygon, Svg, Circle } from "react-native-svg";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function SwipePadServe(props) {
  // console.log(tableSubtypeDummyData);
  // console.log(" SWIPE PAD: are we called?");
  const userReducer = useSelector((state) => state.user);
  const scriptReducer = useSelector((state) => state.script);

  // const tableTypeDummyData = scriptReducer.typesArray;
  const tableSubtypeDummyData = scriptReducer.subtypesArray;

  const cx = userReducer.circleRadiusMiddle; // Center x-coordinate
  const cy = userReducer.circleRadiusMiddle; // Center y-coordinate
  const numTrianglesOuter = props.numTrianglesOuter;
  const extensionFactor = 1.5; // Extend triangle base 10% beyond the circle
  // Generate triangle points for each triangle
  const trianglesMiddle = Array.from({ length: props.numTrianglesMiddle }).map(
    (_, index) => {
      const cx = userReducer.circleRadiusMiddle; // Center x-coordinate
      const cy = userReducer.circleRadiusMiddle; // Center y-coordinate
      const angle = (index * 360) / props.numTrianglesMiddle; // Divide circle into 8 parts
      const rad = (Math.PI / 180) * angle; // Convert to radians

      // Extended base points beyond the circle
      const base1X =
        cx + userReducer.circleRadiusMiddle * extensionFactor * Math.cos(rad);
      const base1Y =
        cy + userReducer.circleRadiusMiddle * extensionFactor * Math.sin(rad);

      const base2X =
        cx +
        userReducer.circleRadiusMiddle *
          extensionFactor *
          Math.cos(rad + Math.PI / (props.numTrianglesMiddle / 2)); // x degrees in radians
      const base2Y =
        cy +
        userReducer.circleRadiusMiddle *
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
      const cx = userReducer.circleRadiusOuter; // Center x-coordinate
      const cy = userReducer.circleRadiusOuter; // Center y-coordinate
      const angle = (index * 360) / numTrianglesOuter; // Divide circle into 8 parts
      const rad = (Math.PI / 180) * angle; // Convert to radians

      // Extended base points beyond the circle
      const base1X =
        cx + userReducer.circleRadiusOuter * extensionFactor * Math.cos(rad);
      const base1Y =
        cy + userReducer.circleRadiusOuter * extensionFactor * Math.sin(rad);

      const base2X =
        cx +
        userReducer.circleRadiusOuter *
          extensionFactor *
          Math.cos(rad + Math.PI / (numTrianglesOuter / 2)); // x degrees in radians
      const base2Y =
        cy +
        userReducer.circleRadiusOuter *
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
    // console.log(
    //   `--> props.numTrianglesMiddle: ${props.numTrianglesMiddle}, props.numTrianglesOuter: ${props.numTrianglesOuter}`
    // );
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
    width: userReducer.circleRadiusOuter * 2,
    height: userReducer.circleRadiusOuter * 2,
    borderRadius: userReducer.circleRadiusOuter,
    overflow: "hidden",
    transform: [{ rotate: "-15deg" }],
    transform: [{ rotate: rotateOuter ? "-15deg" : "0deg" }],
    // borderWidth: 1,
    // borderColor: "black",
  };
  // ------ Middle Circle ------
  const styleVwMiddleCircle = {
    position: "absolute",
    width: userReducer.circleRadiusMiddle * 2,
    height: userReducer.circleRadiusMiddle * 2,
    top: userReducer.circleRadiusOuter - userReducer.circleRadiusMiddle,
    left: userReducer.circleRadiusOuter - userReducer.circleRadiusMiddle,
    borderRadius: userReducer.circleRadiusMiddle,
    overflow: "hidden",
    // borderWidth: 1,
    // transform: [{ rotate: rotateInner ? "-30deg" : "0deg" }],
    transform: [{ rotate: rotateMiddle ? "-30deg" : "0deg" }],
  };
  const styleCircleInner = {
    position: "absolute",
    top: userReducer.circleRadiusMiddle - userReducer.circleRadiusInner,
    left: userReducer.circleRadiusMiddle - userReducer.circleRadiusInner,
    height: userReducer.circleRadiusInner * 2,
    width: userReducer.circleRadiusInner * 2,
    // zIndex: 3,
  };

  const estimatedWidthOfTextMiddle = 35;
  const estimatedHeightOfTextMiddle = 20;
  const estimatedWidthOfTextOuter = 10;
  const estimatedHeightOfTextOuter = 10;

  const dictTextPositionsMiddle = {
    1: {
      // Right (Bloc)
      top: userReducer.circleRadiusOuter - estimatedHeightOfTextMiddle / 2,
      left: userReducer.circleRadiusOuter + userReducer.circleRadiusInner,
      selected: true,
    },
    2: {
      // Bottom (Def)
      top: userReducer.circleRadiusOuter + userReducer.circleRadiusInner,
      left: userReducer.circleRadiusOuter - estimatedWidthOfTextMiddle / 2,
      selected: true,
    },
    3: {
      // Left (Set)
      top: userReducer.circleRadiusOuter - estimatedHeightOfTextMiddle / 2,
      left:
        userReducer.circleRadiusOuter -
        userReducer.circleRadiusInner -
        estimatedWidthOfTextMiddle,
      selected: true,
    },
    4: {
      // Top (Att)
      top:
        userReducer.circleRadiusOuter -
        userReducer.circleRadiusInner -
        estimatedHeightOfTextMiddle,
      left: userReducer.circleRadiusOuter - estimatedWidthOfTextMiddle / 2,
      selected: true,
    },
  };

  const dictTextPositionsOuterPlaceholder = Object.fromEntries(
    Array.from({ length: 12 }, (_, i) => [i + 5, { right: 0, bottom: 0 }])
  );

  const dictTextPositionsOuter = {
    ...dictTextPositionsOuterPlaceholder,
    5: {
      // Bottom-Right (B2)
      top: userReducer.circleRadiusOuter - estimatedHeightOfTextOuter,
      left: userReducer.circleRadiusOuter * 2 + estimatedWidthOfTextOuter,
      selected: true,
    },
    6: {
      // Bottom-Right (B1)
      top: userReducer.circleRadiusOuter * 1.5,
      left: userReducer.circleRadiusOuter * 2 - estimatedWidthOfTextOuter,
      selected: true,
    },
    7: {
      // Bottom-Right (BC)
      top: userReducer.circleRadiusOuter * 2 - estimatedHeightOfTextOuter,
      left: userReducer.circleRadiusOuter * 1.5,
      selected: true,
    },
    8: {
      // Bottom-Center (FB)
      // top:
      //   userReducer.circleRadiusOuter * 2 -
      //   (userReducer.circleRadiusOuter - userReducer.circleRadiusMiddle),
      top: userReducer.circleRadiusOuter * 2,
      left: userReducer.circleRadiusOuter - estimatedWidthOfTextOuter,
      selected: true,
    },
    9: {
      // Bottom-Left (AC)
      top: userReducer.circleRadiusOuter * 2 - estimatedHeightOfTextOuter,
      left: userReducer.circleRadiusOuter * 0.3,
      selected: true,
    },
    10: {
      // Left-Bottom (NS)
      top: userReducer.circleRadiusOuter * 1.5,
      left: -estimatedWidthOfTextOuter,
      selected: true,
    },
    11: {
      // Right-Center (Q)
      top: userReducer.circleRadiusOuter - estimatedHeightOfTextOuter,
      left: -estimatedWidthOfTextOuter * 2,
      selected: true,
    },
    12: {
      // Left-Top (Hi)
      top: userReducer.circleRadiusOuter * 0.3,
      left: -estimatedWidthOfTextOuter,
      selected: true,
    },
    13: {
      // Top-Left (Tip)
      top: -estimatedHeightOfTextOuter,
      // top: 20,
      left: userReducer.circleRadiusOuter * 0.3,
      selected: true,
    },

    14: {
      // Top-Center (Pwr)
      top: -estimatedHeightOfTextOuter * 2,
      left: userReducer.circleRadiusOuter - estimatedWidthOfTextOuter,
      selected: true,
    },
    15: {
      // Top-Right (Roll)
      top: -estimatedHeightOfTextOuter,
      // top: 20,
      left: userReducer.circleRadiusOuter * 1.5,
      selected: true,
    },
    16: {
      // Top-Right (Roll)
      top: userReducer.circleRadiusOuter * 0.3,
      // top: 20,
      // left: userReducer.circleRadiusOuter * 1.5,
      left: userReducer.circleRadiusOuter * 2 - estimatedWidthOfTextOuter,
      selected: true,
    },
  };

  // console.log("what is dictTextPositionsOuter[index] ?");
  // console.log(dictTextPositionsOuter[5]);
  return (
    // <View style={[props.styleVwMainPosition, styleVwOuter]}>
    <View style={props.styleVwMainPosition}>
      <View style={styleVwOuterSizeAndRotation}>
        <Svg
          height={userReducer.circleRadiusOuter * 2}
          width={userReducer.circleRadiusOuter * 2}
        >
          {trianglesOuter.map((points, index) => {
            if (index >= 8 && index <= 10) {
              return (
                <Polygon
                  key={index}
                  points={points}
                  fill={
                    props.swipeColorDict[1 + props.numTrianglesMiddle + index]
                  } // 50% transparent blue
                />
              );
            }
          })}
        </Svg>
        {/* ---- Middle Circle ---- */}
        <View style={styleVwMiddleCircle}>
          <Svg
            height={userReducer.circleRadiusMiddle * 2}
            width={userReducer.circleRadiusMiddle * 2}
          >
            {trianglesMiddle.map((points, index) => {
              if (index == 3) {
                return (
                  <View
                    key={index}
                    style={{
                      width: userReducer.circleRadiusMiddle + 5,
                      height: userReducer.circleRadiusMiddle + 5,
                    }}
                  >
                    <Polygon
                      key={index}
                      points={points}
                      fill={props.swipeColorDict[index + 1]}
                    />
                  </View>
                );
              }
            })}
          </Svg>
          {/* ---- Inner circle ---- */}
          <Svg
            height={userReducer.circleRadiusInner * 2}
            width={userReducer.circleRadiusInner * 2}
            style={styleCircleInner}
          >
            <Circle
              cx={userReducer.circleRadiusInner} // Centering horizontally (x coords w/ respect to parent <Svg/>)
              cy={userReducer.circleRadiusInner} // Centering vertically (y coords w/ respect to parent <Svg/>)
              r={userReducer.circleRadiusInner}
              // stroke="black"
              // strokeWidth="1"
              fill={props.swipeColorDict["center"]}
            />
          </Svg>
        </View>
      </View>
      {/* --- TEXT MIDDLE Circle ---- */}
      {Array.from({ length: 4 }, (_, index) => {
        if (index == 3) {
          return (
            <View
              key={index}
              style={{
                position: "absolute",
                top: dictTextPositionsMiddle[index + 1].top,
                left: dictTextPositionsMiddle[index + 1].left,
                justifyContent: "center",
                alignItems: "center",
                width: estimatedWidthOfTextMiddle,
              }}
            >
              <Text
                key={index}
                style={{
                  color:
                    userReducer.swipePadTextStyleMiddleCircle[index + 1].color,
                  fontSize:
                    userReducer.swipePadTextStyleMiddleCircle[index + 1]
                      .fontSize,
                  fontWeight:
                    userReducer.swipePadTextStyleMiddleCircle[index + 1]
                      .fontWeight,
                }}
              >
                {dictTextPositionsMiddle[index + 1].selected
                  ? scriptReducer.typesArray[index]
                  : null}
              </Text>
            </View>
          );
        }
      })}
      {/* --- TEXT Outer Circle ---- */}
      {Array.from({ length: 12 }, (_, index) => {
        if (index >= 8 && index <= 10) {
          return (
            <View
              key={index + 4}
              style={{
                position: "absolute",
                top: dictTextPositionsOuter[index + 5].top,
                left: dictTextPositionsOuter[index + 5].left,
              }}
            >
              <Text
                key={index}
                style={{
                  color:
                    userReducer.swipePadTextStyleOuterCircle[index + 1].color,
                  fontSize:
                    userReducer.swipePadTextStyleOuterCircle[index + 1]
                      .fontSize,
                  fontWeight:
                    userReducer.swipePadTextStyleOuterCircle[index + 1]
                      .fontWeight,
                }}
              >
                {dictTextPositionsOuter[index + 5].selected
                  ? tableSubtypeDummyData[index]
                  : null}
              </Text>
            </View>
          );
        }
      })}

      {/* --- TEXT OUter Circle ----- */}
      {/* {Array.from({ length: 12 }, (_, index) => (
        <View>
          <Text>{index + 4}</Text>
        </View>
      ))} */}
    </View>
  );
}
