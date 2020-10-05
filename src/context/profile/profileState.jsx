import React, { useReducer } from "react";
import axios from "axios";
import ProfileContext from "./profileContext";
import ProfileReducer from "./profileReducer";
import {
  GET_USER_PROFILE,
  GET_USER_NOTIFICATIONS,
  SET_CURRENT_USER,
} from "../types";

const ProfileState = (props) => {
  const api = true;
  const dev = true;
  const initialState = !api
    ? {
        currentTeam: "",
        currentUser: "",
        userProfile: {
          displayName: "Giovanni",
          status: "Status",
          workTime: "07h às 17h",
          profileType: "Admin",
          team: "ATBR: Automation Team",
          clients: ["ATBR: Automation Team"],
          profilePic: "profile_pic.jpg",
        },
        navs: [
          {
            icon: "",
            name: "Dashboard",
            to: "/dashboard",
          },
          {
            icon: "",
            name: "Avaliação (ADI)",
            to: "/adi",
          },
          {
            icon: "",
            name: "Confalt",
            to: "/confalt",
          },
          {
            icon: "",
            name: "Gestão de Absenteismo",
            to: "/absenteismo",
          },
          {
            icon: "",
            name: "Resultados",
            to: "/results",
          },
          {
            icon: "",
            name: "Férias",
            to: "/vacation",
          },
          {
            icon: "",
            name: "Banco de Ideias",
            to: "/idealog",
          },
          {
            icon: "",
            name: "Ranking",
            to: "/ranking",
          },
          {
            icon: "",
            name: "Central de Notificações",
            to: "/notification",
          },
          {
            icon: "",
            name: "Times",
            to: "/times",
          },
          {
            icon: "",
            name: "Schedule",
            to: "/schedule",
          },
          {
            icon: "",
            name: "Férias",
            to: "/vacation",
          },
        ],
        notifications: [],
      }
    : {
        currentTeam: "",
        currentUser: "",
        userProfile: {
          team: "",
          clients: [],
          profilePic: "profile_pic.jpg",
        },
        navs: [],
        notifications: [],
      };

  const [state, dispatch] = useReducer(ProfileReducer, initialState);

  const apiURL = dev ? "https://localhost:7376" : "";

  /* Get user profile */
  const getUserProfile = async () => {
    const res = await axios.get(apiURL + "/api/user/profile?full=true");
    console.log(res.data);
    res.data.user.profilePic = dev
      ? apiURL + res.data.user.profilePic
      : res.data.user.profilePic;
    dispatch({
      type: GET_USER_PROFILE,
      payload: res.data,
    });
  };

  const getUserNotifications = async (limit) => {
    const res = await axios.get(apiURL + "/api/user/notifications?full=true");

    dispatch({
      type: GET_USER_NOTIFICATIONS,
      payload: res.data.docs,
    });
  };

  const setCurrentUser = (user) => {
    dispatch({
      type: SET_CURRENT_USER,
      payload: user,
    });
  };

  return (
    <ProfileContext.Provider
      value={{
        userProfile: state.userProfile,
        navs: state.navs,
        getUserProfile,
        api,
        dev,
        notifications: state.notifications,
        getUserNotifications,
        setCurrentUser,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};
export default ProfileState;
