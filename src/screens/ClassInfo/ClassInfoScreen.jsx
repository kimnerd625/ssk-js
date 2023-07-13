import React from "react";

import MainLayout from "../../components/common/MainLayout";
import styled from "styled-components/native";
import Calendar from "../../components/calendar/Calendar";
import { useNavigation } from "@react-navigation/native";
import HwNotePreview from "../../components/homeworkNote/HwNotePreview";
import ReviewNotePreview from "../../components/reviewNote/ReviewNotePreview";
import StudentInfo from "../../components/classInfo/StudentInfo";
import TeacherInfo from "../../components/classInfo/TeacherInfo";
import SubLayout from "../../components/common/SubLayout";
import ClassInfo from "../../components/classInfo/ClassInfo";
const ClassInfoScreen = () => {
  const navigation = useNavigation();

  const handlePressHwBtn = () => {
    navigation.navigate("HwListPage");
  };
  const handlePressReviewBtn = () => {
    navigation.navigate("ReviewListPage");
  };
  return (
    <MainLayout headerText={"수업 정보"} headerType={"back"}>
      <SubLayout>
        <InfroWrapper>
          <TeacherInfo />
          <StudentInfo />
          <ClassInfo />
        </InfroWrapper>
      </SubLayout>
      <Calendar />
      <SubLayout>
        <TouchableArea onPress={handlePressHwBtn}>
          <HwNotePreview />
        </TouchableArea>
        <TouchableArea onPress={handlePressReviewBtn}>
          <ReviewNotePreview />
        </TouchableArea>
      </SubLayout>
    </MainLayout>
  );
};

export default ClassInfoScreen;

const TouchableArea = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  activeopacity: 0.8;
`;
const Wrapper = styled.View`
  margin-vertical: 15;
  padding-horizontal: 20;
`;

const InfroWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-vertical: 25;
`;
