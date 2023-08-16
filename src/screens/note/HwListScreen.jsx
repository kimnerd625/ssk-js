import React, { useEffect, useState } from "react";

import styled from "styled-components/native";

import MainLayout from "../../components/common/MainLayout";
import NoteHeader from "../../components/note/NoteHeader";
import HwList from "../../components/note/HwList";
import ConfirmButtons from "../../components/common/ConfirmButtons";
import color from "../../common/color";
import client from "../../config/axios";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/core";
import Loading from "../../components/common/Loading";
import { Alert } from "react-native";

const HwListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { tutoringId } = route.params;

  const isFocused = useIsFocused();

  const [editMode, setEditMode] = useState(false);

  const [loading, setLoading] = useState(false);

  const [selectedList, setSelectedList] = useState([]);
  const [assignmentList, setAssignmentList] = useState([]);

  const getAssignmentList = async () => {
    setLoading(true);
    try {
      const ret = await client.post("/api/assignment/list", {
        tutoringId,
      });

      if (ret.status == 200) {
        // console.log(ret.data);
        setAssignmentList(ret.data);
      }
    } catch (err) {
      console.log("get assignment list error: ", err);
      const status = err?.response?.status;

      if (status == 404) {
        setAssignmentList([]);
      }
    }
    setLoading(false);
  };

  const handleDeleteAssignments = () => {
    Alert.alert("숙제 목록 삭제", "선택한 숙제 목록을 삭제하시겠습니까?", [
      {
        text: "취소",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "삭제",
        onPress: async () => {
          const assignmentIdList = selectedList.map((el) => el.id);

          try {
            const ret = await client.post(`/api/assignment/multi-delete`, {
              assignmentIdList,
            });

            if (ret.status == 200) {
              await getAssignmentList();
              setEditMode(false);
            }
          } catch (err) {
            console.log("delete multiple assignments error: ", err);
          }
        },
      },
    ]);
  };

  const goCreateHwScreen = () => {
    navigation.navigate("CreateHwScreen", {
      tutoringId,
    });
  };

  const goSubmitHwScreen = () => {
    navigation.navigate("SubmitHwScreen", {
      assignmentList,
    });
  };

  useEffect(() => {
    if (isFocused) {
      getAssignmentList();
    }
  }, [tutoringId, isFocused]);

  return (
    <>
      <MainLayout
        headerText={"숙제 노트"}
        headerLeftType={"back"}
        headerRightType={"pen"}
        handlePressHeaderRight={goCreateHwScreen}
      >
        <NoteHeader
          text={"숙제 목록"}
          type={"deleteAndWrite"}
          handlePressLeftButton={() => {
            if (assignmentList && assignmentList.length > 0) {
              setEditMode(!editMode);
            }
          }}
          handlePressRightButton={goSubmitHwScreen}
        />

        <Container>
          {loading ? (
            <Loading />
          ) : (
            <HwList
              hwList={assignmentList}
              editMode={editMode}
              selectedList={selectedList}
              setSelectedList={setSelectedList}
            />
          )}
        </Container>
      </MainLayout>

      {editMode && (
        <ConfirmButtons
          cancelText="취소"
          confirmText={"삭제"}
          onCancel={() => {
            setEditMode(false);
          }}
          onConfirm={handleDeleteAssignments}
          buttonColor={color.COLOR_RED_TEXT}
        />
      )}
    </>
  );
};

export default HwListScreen;

const Container = styled.View`
  padding-horizontal: 15;
`;
