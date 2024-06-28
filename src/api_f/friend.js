import {api, api_user} from "../config_f/network.js";

export const getFriends = async (data) => {
    const res = await api("/friends", "get", data);
    return res;
};

export const getSearchList = async (data) => {
    const res = await api_user("/users/search?nickname="+data.nickname, "get", data);
    return res;
};

export const getRequests = async (data) => {
    const res = await api("/friends/requests", "get", data);
    return res;
};

export const respondToRequests = async (data) => {
    const res = await api("/friends/requests/"+data.requestId+"?status="+data.acceptRequest, "delete", data);
    return res;
};