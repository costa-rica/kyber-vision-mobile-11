// import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  Animated,
  Easing,
  Switch,
  StatusBar,
  SafeAreaView,
  Platform,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import * as FileSystem from "expo-file-system";
import TemplateView from "./subcomponents/TemplateView";
import { useDispatch } from "react-redux";
import { storeVideoDetailsInRedux } from "../reducers/user";
import { useSelector } from "react-redux";
import { appendAction, deleteScript } from "../reducers/script";
import ButtonKv from "./subcomponents/ButtonKv";

export default function ScriptingMatchSelection({ navigation }) {
  const [currentYear, setCurrentYear] = useState(null); // State for the currently visible year
  const [videosList, setVideosList] = useState([]);
  const [isDownloadModalVisible, setIsDownloadModalVisible] = useState(false);
  const [downloadStatuses, setDownloadStatuses] = useState({});
  const [downloadProgress, setDownloadProgress] = useState(0); // For download progress indication
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.user);

  useEffect(() => {
    fetchVideoListApiCall();
  }, []);

  const fetchVideoListApiCall = async () => {
    console.log(`API URL: ${process.env.EXPO_PUBLIC_API_URL}/videos`);

    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/videos`);

    if (response.status === 200) {
      const resJson = await response.json();

      const statuses = {};
      for (const elem of resJson.videos) {
        console.log(`checking for: ${elem.filename} `);
        const fileUri = `${FileSystem.documentDirectory}${elem.filename}`;
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        statuses[elem.filename] = fileInfo.exists; // Save download status (true/false)
        console.log(`this file exists: ${fileInfo.exists} `);
      }
      setDownloadStatuses(statuses);
      console.log(`--- response object ----`);
      console.log(resJson);
      const videosObjArray = resJson.videos.map((elem, i) => {
        console.log(
          `creating object for: ${elem.filename}, the file exits: ${
            downloadStatuses[elem.filename]
          }`
        );

        return {
          id: `${elem.id}`,
          name: `${elem.matchName}`,
          date: elem.date,
          matchName: `${elem.matchName}`,
          scripted: false,
          // downloaded: downloadStatuses[elem.filename] ? true : false,
          downloaded: statuses[elem.filename] ? true : false, // Use statuses here
          apiDownloadUrl: `${process.env.EXPO_PUBLIC_API_URL}/videos/${elem.filename}`,
          durationOfMatch: elem.durationString,
          filename: elem.filename,
          // setTimeStamps: elem.setTimeStampsArray,
          setTimeStampsArray: elem.setTimeStampsArray,
        };
      });
      setVideosList(videosObjArray);
      checkDownloadedStatus(data.videos);
    } else {
      console.log(`There was a server error: ${response.status}`);
    }
  };

  const pressBtnVideo = async (elem) => {
    console.log("pressed pressBtnVideo");

    dispatch(
      storeVideoDetailsInRedux({
        video: elem,
        // videoSetTimesArray: elem.setTimeStamps,
      })
    );
    console.log(`hwat is downloadStatuses[elem.filename]`);
    console.log(elem.filename);
    console.log(downloadStatuses[elem.filename]);
    if (!downloadStatuses[elem.filename]) {
      console.log("1 -> triggering download video");
      setIsDownloadModalVisible(true); // Show modal
      try {
        await downloadVideo(elem.filename);
      } catch (error) {
        setDownloadProgress(0);
        console.error("Download failed:", error);
        Alert.alert("Error", "Failed to download the video. Please try again.");
      } finally {
        setIsDownloadModalVisible(false);
      }
    }
    await downloadVideoScripts(elem);
    console.log("go to Scripting screen ....");
    navigation.navigate("Scripting", {
      matchName: elem.matchName,
      videoUri: `${FileSystem.documentDirectory}${elem.filename}`,
    });
  };

  const downloadVideo = async (filename) => {
    console.log("--- in downloadVideo");
    const videoUrl = `${process.env.EXPO_PUBLIC_API_URL}/videos/${filename}`;
    console.log(`calling: ${videoUrl}`);
    const fileUri = `${FileSystem.documentDirectory}${filename}`;

    const downloadResumable = FileSystem.createDownloadResumable(
      videoUrl,
      fileUri,
      {},
      (downloadProgress) => {
        const progress =
          downloadProgress.totalBytesWritten /
          downloadProgress.totalBytesExpectedToWrite;
        setDownloadProgress(progress * 100); // Update progress state
        // console.log(`Download progress: ${progress * 100}%`);
      }
    );

    try {
      console.log("Trying to download");
      setIsDownloadModalVisible(true); // Show modal when download starts
      const result = await downloadResumable.downloadAsync();
      console.log("Download complete:", result.uri);

      // Update downloadStatuses and UI
      setDownloadStatuses((prev) => ({
        ...prev,
        [filename]: true,
      }));
    } catch (error) {
      console.log("Failed to download");
      console.error("Download failed:", error);
    } finally {
      setIsDownloadModalVisible(false); // Hide modal when download finishes
      setDownloadProgress(0); // Reset progress
    }
  };

  const downloadVideoScripts = async (elem) => {
    const videoScriptsUrl = `${process.env.EXPO_PUBLIC_API_URL}/scripts/${elem.id}`;
    const response = await fetch(videoScriptsUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userReducer.token}`, // Add token to Authorization header
      },
    });
    if (response.status == 200) {
      dispatch(deleteScript());
      const resJson = await response.json();
      console.log(resJson);
      const scriptId = resJson?.script?._id;
      if (scriptId) {
        resJson.actionsArray.map((elem, index) => {
          dispatch(appendAction({ scriptId, action: elem }));
        });
      } else {
        console.log("no script assigned to video");
      }
    }
  };

  // Viewable items configuration
  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50, // Item is considered visible if 50% or more is visible
  });

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const latestVisibleDate = viewableItems[0].item.date; // Get the date of the first visible item
      const latestYear = new Date(latestVisibleDate).getFullYear(); // Extract the year
      setCurrentYear(latestYear); // Update the state
    }
  });

  const formatDate = (date) => {
    const options = { day: "numeric", month: "short" }; // Example: "10 Dec"
    return new Intl.DateTimeFormat("en-GB", options).format(new Date(date));
  };
  const TableRow = ({ item }) => (
    <View style={styles.vwRow}>
      <TouchableOpacity
        style={styles.vwRowLeft}
        onPress={() => console.log("download game")}
      >
        {/* {item.downloaded ? ( */}
        {downloadStatuses[item.filename] ? (
          <Image
            source={require("../assets/images/iconPhone.png")}
            alt="logo"
            resizeMode="contain"
          />
        ) : (
          <Image
            source={require("../assets/images/btnDownload.png")}
            alt="logo"
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.vwRowRight}
        onPress={() => pressBtnVideo(item)}
      >
        <View style={styles.vwRowRightOne}>
          <Text style={styles.txtVwRowRightOne}>{item.matchName}</Text>
          <Text style={styles.txtVwRowRightOneDuration}>
            ({item.durationOfMatch})
          </Text>
        </View>
        <View style={styles.vwRowRightTwo}>
          {item.scripted ? (
            <Image
              source={require("../assets/images/imgNotScripted.png")}
              alt="logo"
              resizeMode="contain"
            />
          ) : null}
        </View>
        <View style={styles.vwRowRightThree}>
          <Text style={styles.txtVwRowRightThree}>{formatDate(item.date)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <TemplateView navigation={navigation}>
      <View style={styles.container}>
        {/* Download Modal */}

        <Modal
          transparent
          visible={isDownloadModalVisible}
          animationType="fade"
        >
          <View style={styles.modalDownloadBackdrop}>
            <View style={styles.downloadModal}>
              <Text style={styles.modalText}>Downloading...</Text>
              <Text style={styles.modalText}>
                {`Progress: ${downloadProgress.toFixed(0)}%`}
              </Text>
            </View>
          </View>
        </Modal>
        {/* Main screen */}

        <View style={styles.containerMiddle}>
          {/* -------- containerMiddleTop ------ */}
          <View style={styles.containerMiddleTop}>
            <Text style={styles.txtContainerMiddleTop}>
              Matchs de l’équipe :
            </Text>

            <View style={styles.vwCapsuleTeam}>
              <View style={styles.vwTeamAndIcon}>
                <Text style={styles.txtSelectTeam}>AUC Depart’ F</Text>

                <View style={styles.vwImgCloudIcon}>
                  <Image
                    style={styles.imgCloudIcon}
                    source={require("../assets/images/cloudIcon.png")}
                    alt="logo"
                    resizeMode="contain"
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={() => console.log("- pressed downArrow")}
              >
                <Image
                  style={styles.imgBtnDownArrow}
                  source={require("../assets/images/btnDownArrow.png")}
                  alt="logo"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* -------- containerMiddleBottom: Table / FlatList ------ */}
          <View style={styles.containerMiddleBottom}>
            <Text style={styles.txtContainerMiddleBottom}>{currentYear}</Text>
          </View>
        </View>
        <View style={styles.containerBottom}>
          <FlatList
            data={videosList}
            renderItem={TableRow}
            keyExtractor={(item) => item.id}
            onViewableItemsChanged={onViewableItemsChanged.current}
            viewabilityConfig={viewabilityConfig.current}
          />
          <View style={styles.vwLiveRowSuper}>
            <ButtonKv
              colorBackground={"#970F9A"}
              colorText={"white"}
              fontSize={48}
              width={Dimensions.get("window").width * 0.95}
              onPress={() => navigation.navigate("ScriptingLive")}
            >
              Live
            </ButtonKv>
          </View>
        </View>
      </View>
    </TemplateView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EBF2",
  },

  // ----- MIDDLE Container -----
  containerMiddle: {
    height: "20%",
    justifyContent: "space-between",
  },
  containerMiddleTop: {
    justifyContent: "center",
    alignItems: "center",
  },
  txtContainerMiddleTop: {
    textAlign: "center",
    color: "#A3A3A3",
    fontSize: 20,
    fontFamily: "ApfelGrotezk",
  },
  vwCapsuleTeam: {
    backgroundColor: "#A3A3A3",
    marginTop: 10,
    borderRadius: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "75%",
    padding: 5,
  },
  vwTeamAndIcon: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  txtSelectTeam: {
    color: "white",
    fontSize: 20,
    fontFamily: "ApfelGrotezk",
  },
  vwImgCloudIcon: { paddingLeft: 5 },
  containerMiddleBottom: {
    justifyContent: "center",
  },
  txtContainerMiddleBottom: {
    textAlign: "center",
    color: "#A3A3A3",
    fontSize: 20,
    fontFamily: "ApfelGrotezk",
  },
  // ----- BOTTOM Container -----
  containerBottom: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },

  // ------ FLATLIST -----
  vwRow: {
    backgroundColor: "#A3A3A3",
    marginTop: 10,
    borderRadius: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    padding: 10,
  },
  vwRowLeft: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  vwRowRight: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  vwRowRightOne: {
    justifyContent: "center",
    flex: 1,
  },
  txtVwRowRightOne: {
    color: "white",
    fontSize: 20,
    fontFamily: "ApfelGrotezk",
  },
  txtVwRowRightOneDuration: {
    color: "black",
    fontSize: 15,
    fontFamily: "ApfelGrotezk",
  },
  vwRowRightTwo: {
    justifyContent: "center",
  },

  vwRowRightThree: {
    width: "20%",

    justifyContent: "center",
    alignItems: "center",
  },
  txtVwRowRightThree: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontFamily: "ApfelGrotezk",
  },

  // ---- Live Row -----
  vwLiveRowSuper: {
    padding: 20,
    width: "100%",
    // backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
  // vwLiveRow: {
  //   backgroundColor: "#970F9A",
  //   marginTop: 10,
  //   borderRadius: 35,
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   width: "95%",
  //   padding: 10,
  // },
  // txtLive: {
  //   fontSize: 48,
  //   color: "white",
  //   // textAlign: "center",
  //   fontFamily: "ApfelGrotezk",
  //   // backgroundColor: "green",
  // },

  // Modal styles Download
  modalDownloadBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  downloadModal: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  modalText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    fontFamily: "ApfelGrotezk",
  },
});
