import {useEffect, useRef, useState} from "react";
import {useAuth} from "@context/AuthContext";
import {BASE_URL, createAxiosInstance, WEB_SOCKET_URL} from "@config/axiosConfig";

type TServerMatch = {
    score: {
        match_id: number;
        id: string;
        tos_winner: string;
        first_bat: string;
        team1: {
            teamName: string;
            balls: number;
            extras: number;
            fours: number;
            marks: number;
            ones: number;
            overs: number;
            sixes: number;
            threes: number;
            twos: number;
            wickets: number;
        };
        team2: {
            teamName: string;
            balls: number;
            extras: number;
            fours: number;
            marks: number;
            ones: number;
            overs: number;
            sixes: number;
            threes: number;
            twos: number;
            wickets: number;
        };
    }[];
};

export type TMatch = {
    team1: string;
    team2: string;
    match_no: number;
    id: string;
    tos_winner: string;
    first_bat: string;
    scorecard: {
        team1: {
            marks: number;
            wickets: number;
            overs: number;
            balls: number;
            extras: number;
        };
        team2: {
            marks: number;
            wickets: number;
            overs: number;
            balls: number;
            extras: number;
        };
    };
};

const reconnectDelay = 3000;

export default function useLiverScoreUpdateService() {
    const [liveMatches, setLiveMatches] = useState<TMatch[]>([]);
    const authContext = useAuth();
    const axiosInstanceForFitSixes = createAxiosInstance(authContext, BASE_URL.FIT_SIXES);
    const [serverMessages, setServerMessages] = useState<TServerMatch | null>(null);
    const [, setIsConnected] = useState<boolean>(false);
    const ws = useRef<WebSocket | null>(null);

    const outputArr: TMatch[] = liveMatches.map((item1) => {
        const matchingItem2 = serverMessages && serverMessages.score && serverMessages.score.find(
            (item2) => item2.match_id.toString() === item1.id
        );
        if (matchingItem2) {
            return {
                matchId: matchingItem2.match_id,
                match_no: item1.match_no,
                id: item1.id,
                team1: item1.team1,
                team2: item1.team2,
                tos_winner: item1.tos_winner,
                first_bat: item1.first_bat,
                scorecard: {
                    team1: {
                        balls: matchingItem2.team1.balls,
                        marks: matchingItem2.team1.marks,
                        overs: matchingItem2.team1.overs,
                        wickets: matchingItem2.team1.wickets,
                        extras: matchingItem2.team1.extras,
                    },
                    team2: {
                        balls: matchingItem2.team2.balls,
                        marks: matchingItem2.team2.marks,
                        overs: matchingItem2.team2.overs,
                        wickets: matchingItem2.team2.wickets,
                        extras: matchingItem2.team2.extras,
                    },
                },
            };
        } else {
            return item1;
        }
    });

    const fetchLiveMatches = async () => {
        let url = "matches/ongoing";

        try {
            axiosInstanceForFitSixes
                .get(`${url}`)
                .then((response) => {
                    if (response?.data?.data?.matches?.matches) {
                        setLiveMatches(response.data.data.matches.matches);
                    } else {
                        console.error("Error");
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        } catch (e) {
            console.log(e);
        }
    };

    const connectToWebSocket = () => {
        ws.current = new WebSocket(WEB_SOCKET_URL);

        ws.current.onopen = () => {
            console.log("connected");
            setIsConnected(true);
            const data = {action: "sendMessage", message: "hello server"};
            // @ts-ignore
            ws.current.send(JSON.stringify(data));
        };

        ws.current.onclose = () => {
            console.log("disconnected");
            setIsConnected(false);

            setTimeout(connectToWebSocket, reconnectDelay);
        };

        ws.current.onerror = (e) => {
            // @ts-ignore
            console.log("error:", e.message);
        };

        ws.current.onmessage = (e) => {
            const incomingMessage = e.data;
            console.log("Incoming Data");
            setServerMessages(JSON.parse(incomingMessage));
        };
    };

    useEffect(() => {
        connectToWebSocket();
        fetchLiveMatches().catch((e) => console.log(e));

        return () => {
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                ws.current.close();
            }
        };
    }, []);

    return {
        outputArr,
        fetchLiveMatches,
    }
}