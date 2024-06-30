import React, { useEffect, useState } from 'react';
import "../styles/requestFriendList.css";
import accept from "../assets/images/accept.svg";
import refuse from "../assets/images/refuse.svg";
import { getRequests, respondToRequests } from "../api_f/friend.js";

const RequestFriendList = () => {
    const [requests, setRequests] = useState([]);

    const getRequestList = async () => {
        try {
            const res = await getRequests();
            if (res.status === 200) {
                setRequests(res.data); // Assuming the API response structure has the friend list in res.data
            }
        } catch (error) {
            console.error("Error fetching friend list", error);
        }
    };

    const respond = async (requestId, acceptRequest) => {
        try {
            console.log(acceptRequest);
            const res = await respondToRequests({ requestId, acceptRequest});
            if (res.status === 200) {
                // Assuming the API returns updated list of requests after responding
                setRequests(res.data);
                if (acceptRequest) {
                    alert("요청을 수락했습니다.");
                } else {
                    alert("요청을 거절했습니다.");
                }
            }
        } catch (error) {
            console.error("Error responding to request", error);
        }
    };

    useEffect(() => {
        getRequestList();
    }, []);

    return (
        <>
            <ul className="requestFriendList">
                {requests.length === 0 && (
                    <><br/><h3 className="noRequests">받은 요청이 없습니다!</h3></>
                )}
                {requests.map(request => (
                    <li key={request.requestId} className="list">
                        <p className="friend">
                            <button>{request.userNickname}</button>
                            님이 친구 요청을 보냈습니다.
                        </p>
                        <div className="requestBtn">
                            <button onClick={() => {
                                respond(request.requestId, true);
                            }}>
                                <img src={accept} alt="수락" />
                            </button>
                            <button onClick={() => {
                                respond(request.requestId, false);
                            }}>
                                <img src={refuse} alt="거절" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default RequestFriendList;
