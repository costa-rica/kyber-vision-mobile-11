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
  Alert,
} from "react-native";
import { useState, useEffect, useRef, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import TemplateView from "./subcomponents/TemplateView";
import { useDispatch } from "react-redux";
import { storeVideoDetailsInRedux } from "../reducers/user";
import { useSelector } from "react-redux";
import {
  appendAction,
  deleteScript,
  initializePlayerNamesArrayRotated,
} from "../reducers/script";
import {
  updateReviewReducerVideoObject,
  createReviewActionsArray,
  createReviewActionsArrayUniquePlayersNamesAndObjects,
} from "../reducers/review";

export default function ReviewMatchSelection({ navigation }) {
  const [currentYear, setCurrentYear] = useState(null); // State for the currently visible year
  const [videosList, setVideosList] = useState([]);
  const [isDownloadModalVisible, setIsDownloadModalVisible] = useState(false);
  const [downloadStatuses, setDownloadStatuses] = useState({});
  const [downloadProgress, setDownloadProgress] = useState(0); // For download progress indication
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.user);
  const reviewReducer = useSelector((state) => state.review);

  useEffect(() => {
    fetchVideoListApiCall();
    dispatch(initializePlayerNamesArrayRotated());
  }, []);
  useEffect(() => {}, [userReducer.videosDownloadedStatusObj]);
  useEffect(() => {
    checkForExistingVideos();
  }, [videosList]);

  const fetchVideoListApiCall = async () => {
    console.log(`API URL: ${process.env.EXPO_PUBLIC_API_URL}/videos`);

    try {
      // const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/videos`);
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/videos`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userReducer.token}`,
          },
        }
      );
      if (response.status !== 200) {
        console.log(`There was a server error: ${response.status}`);
        return;
      }

      const resJson = await response.json();
      // console.log(`--- response object ----`);
      // console.log(resJson);

      const statuses = {};
      for (const elem of resJson.videos) {
        console.log(`checking for: ${elem.filename}`);
        const fileUri = `${FileSystem.documentDirectory}${elem.filename}`;
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        statuses[elem.filename] = fileInfo.exists;
        // dispatch(
        //   setVideosDownloadedStatusObj({
        //     videoDownloadFileName: elem.filename,
        //     videoIsDownloaded: fileInfo.exists,
        //   })
        // );
        console.log(`this file exists: ${fileInfo.exists}`);
      }

      // Map API response to videosList with `matchDate` included
      const videosObjArray = resJson.videos.map((elem) => {
        console.log(
          `creating object for id: ${elem.id} filename: ${elem.filename}`
        );

        return {
          id: `${elem.id}`,
          name: elem.match ? elem.match.matchName : "Unknown Match",
          date: elem.match ? elem.match.matchDate : null, // Ensure matchDate is included
          match: elem.match || {}, // Ensure `match` is always an object
          matchName: elem.match ? elem.match.matchName : "Unknown Match",
          scripted: false,
          downloaded: statuses[elem.filename] || false,
          // downloaded:
          //   userReducer.videosDownloadedStatusObj[elem.filename] || false,
          apiDownloadUrl: elem.url,
          durationOfMatch: elem.durationString,
          filename: elem.filename,
          setTimeStampsArray: elem.setTimeStampsArray,
          videoFileSizeInMb: elem.videoFileSizeInMb,
        };
      });
      console.log(videosObjArray);
      console.log("apiDownload url 🤔 ");
      setVideosList(videosObjArray);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const checkForExistingVideos = async () => {
    if (!videosList.length) return;

    try {
      const statuses = {};
      for (const video of videosList) {
        const fileUri = `${FileSystem.documentDirectory}${video.filename}`;
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        statuses[video.filename] = fileInfo.exists;
      }

      setDownloadStatuses(statuses);
    } catch (error) {
      console.error("Error checking existing videos:", error);
    }
  };

  // const pressBtnVideo = async (elem) => {
  const pressBtnVideo = async (elem) => {
    console.log("in pressBtnVideo");
    console.log(JSON.stringify(elem));
    if (!downloadStatuses[elem.filename]) {
      console.log("1 -> triggering download video");
      await promptDownloadVideo(elem);
    } else {
      await videoIsDownloadedGoToReviewVideo(elem);
    }
  };

  const videoIsDownloadedGoToReviewVideo = async (elem) => {
    // 1.1 get video details in the userReducer <-- might be unnecessary consider deleting.
    dispatch(
      storeVideoDetailsInRedux({
        video: elem,
        // videoSetTimesArray: elem.setTimeStamps,
      })
    );
    // 1.2 get video details in the reviewReducer
    dispatch(updateReviewReducerVideoObject(elem));

    // 3. Get the actions for the match
    await fetchActionsForMatch(elem.match.id);

    // 4. Go to ReviewVideo screen
    console.log("go to ReviewVideo screen ...");
    navigation.navigate("ReviewVideo", {
      matchName: elem.matchName,
      videoUri: `${FileSystem.documentDirectory}${elem.filename}`,
    });
  };

  const promptDownloadVideo = async (elem) => {
    let downloadSizeMessage;
    if (elem.videoFileSizeInMb < 100) {
      downloadSizeMessage = `You are about to download a small (<100 Mb) file`;
    } else {
      downloadSizeMessage = `You are about to download a ${(
        elem.videoFileSizeInMb / 1000
      ).toFixed(1)} GB`;
    }

    Alert.alert(
      downloadSizeMessage, // Title
      "Are you sure you want to proceed?", // Description
      [
        {
          text: "No",
          onPress: () => console.log("❌ No Pressed"),
          style: "cancel", // iOS cancel style
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              // await downloadVideo(elem.filename);
              console.log(`----> tryign to download for videoId: ${elem.id}`);
              // await downloadVideo(elem.id);
              await downloadVideo(elem);
              await videoIsDownloadedGoToReviewVideo(elem);
            } catch (error) {
              setDownloadProgress(0);
              console.error("Download failed:", error);
              Alert.alert(
                "Error",
                "Failed to download the video. Please try again."
              );
            } finally {
              setIsDownloadModalVisible(false);
            }
          },
        },
      ],
      { cancelable: false } // Prevents dismissing by tapping outside on Android
    );
  };

  const downloadVideo = async (elemVideo) => {
    console.log("--- in downloadVideo");

    const videoUrl = `${process.env.EXPO_PUBLIC_API_URL}/videos/${elemVideo.id}`;
    const fileUri = `${FileSystem.documentDirectory}${elemVideo.filename}`;

    const headers = {
      Authorization: `Bearer ${userReducer.token}`,
    };

    const downloadResumable = FileSystem.createDownloadResumable(
      videoUrl,
      fileUri,
      { headers }, // Add headers for authentication
      (downloadProgress) => {
        const progress =
          downloadProgress.totalBytesWritten /
          downloadProgress.totalBytesExpectedToWrite;
        setDownloadProgress(progress * 100);
      }
    );

    try {
      console.log("Trying to download with authentication");
      setIsDownloadModalVisible(true);
      const result = await downloadResumable.downloadAsync();
      console.log("Download complete:", result.uri);

      // Update videosList directly after download
      setVideosList((prevList) =>
        prevList.map((video) =>
          video.filename === elemVideo.filename
            ? { ...video, downloaded: true }
            : video
        )
      );

      // Also update statuses object for consistency
      setDownloadStatuses((prev) => ({
        ...prev,
        [elemVideo.filename]: true,
      }));
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloadModalVisible(false);
      setDownloadProgress(0);
    }
  };

  // const downloadVideoScripts = async (elem) => {
  //   const videoScriptsUrl = `${process.env.EXPO_PUBLIC_API_URL}/scripts/${elem.id}`;
  //   const response = await fetch(videoScriptsUrl, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${userReducer.token}`, // Add token to Authorization header
  //     },
  //   });
  //   if (response.status == 200) {
  //     dispatch(deleteScript());
  //     const resJson = await response.json();
  //     console.log(resJson);
  //     const scriptId = resJson?.script?._id;
  //     if (scriptId) {
  //       resJson.actionsArray.map((elem, index) => {
  //         dispatch(appendAction({ scriptId, action: elem }));
  //       });
  //     } else {
  //       console.log("no script assigned to video");
  //     }
  //   }
  // };

  // fetch Actions for Match
  const fetchActionsForMatch = async (matchId) => {
    console.log("in fetchActionsForMatch for matchId: ", matchId);
    try {
      console.log(`Fetching actions for match: ${matchId}`);
      console.log(
        `${process.env.EXPO_PUBLIC_API_URL}/matches/${matchId}/actions`
      );
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/matches/${matchId}/actions`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userReducer.token}`,
          },
        }
      );
      if (response.status !== 200) {
        console.log(`There was a server error: ${response.status}`);
        return;
      }
      let resJson = null;
      const contentType = response.headers.get("Content-Type");

      if (contentType?.includes("application/json")) {
        resJson = await response.json();
      }
      // console.log(resJson);
      let tempCleanActionsArray = [];
      for (const elem of resJson.actionsArray) {
        // console.log(elem.id);
        tempCleanActionsArray.push({
          actionsDbTableId: elem.id,
          reviewVideoActionsArrayIndex: elem.reviewVideoActionsArrayIndex,
          playerId: elem.playerId,
          timestamp: elem.timestampFromStartOfVideo,
          type: elem.type,
          subtype: elem.subtype,
          quality: elem.quality,
          isDisplayed: true,
          isFavorite: false,
          isPlaying: false,
        });
      }

      dispatch(createReviewActionsArray(tempCleanActionsArray));

      let tempPlayerDbObjectsArray = [];
      console.log(
        `playerDbObjectsArray: ${JSON.stringify(resJson.playerDbObjectsArray)}`
      );
      for (const elem of resJson.playerDbObjectsArray) {
        tempPlayerDbObjectsArray.push({
          ...elem,
          isDisplayed: true,
        });
      }
      dispatch(
        createReviewActionsArrayUniquePlayersNamesAndObjects({
          // playerNamesArray: resJson.playerNamesArray,
          playerDbObjectsArray: tempPlayerDbObjectsArray,
        })
      );
    } catch (error) {
      console.error("Error fetching actions for match:", error);
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
        {item.downloaded ? (
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
          <Text style={styles.txtVwRowRightOne}>
            {item.match && item.match.matchDate
              ? item.match.teamOneName
              : "download fail"}{" "}
            vs{" "}
            {item.match && item.match.matchDate
              ? item.match.teamTwoName
              : "download fail"}
          </Text>
          <Text style={styles.txtVwRowRightOneDuration}>
            {/* ({item.durationOfMatch}) */}
            {item.match && item.match.matchDate
              ? item.match.city
              : "download fail"}
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
          <Text style={styles.txtVwRowRightThree}>
            {item.match && item.match.matchDate
              ? formatDate(item.match.matchDate)
              : "Date Unknown"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <TemplateView navigation={navigation} hideSettings={true} noGrayBand={true}>
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
            <Text style={styles.txtContainerMiddleTop}>Match videos :</Text>

            {/* <Text>{JSON.stringify(userReducer.videosDownloadedStatusObj)}</Text> */}
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
          <View>
            {/* <Text>{JSON.stringify(videosList)}</Text> */}
            {/* <Text>{JSON.stringify(downloadStatuses)}</Text> */}
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
