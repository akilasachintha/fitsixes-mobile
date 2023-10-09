import {RefreshControl, SafeAreaView, ScrollView, Text, View} from "react-native";
import MatchDetailCard, {MatchStatus} from "../components/MatchDetailCard";
import {PATHS} from "../config/paths";
import React, {useEffect, useRef, useState} from "react";
import {useAuth} from "../context/AuthContext";
import {BASE_URL, createAxiosInstance} from "../config/axiosConfig";

export default function MatchesLiveScreen() {
    const [liveMatches, setLiveMatches] = useState([]);
    const [serverMessages, setServerMessages] = useState([]);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const reconnectDelay = 3000;
    const ws = useRef<WebSocket | null>(null);
    const authContext = useAuth();
    const axiosInstanceForFitSixes = createAxiosInstance(authContext, BASE_URL.FIT_SIXES);

    const fetchLiveMatches = () => {
        let url = "matches/ongoing";
        axiosInstanceForFitSixes.get(`${url}`).then((response) => {
            if (response && response.data && response.data.data && response.data.data.matches && response.data.data.matches.matches) {
                setLiveMatches(response.data.data.matches.matches);
            } else {
                console.error("Error");
            }
        }).catch((e) => {
            console.log(e);
        });
    }

    const handleRefresh = () => {
        fetchLiveMatches();
    };

    const connectToWebSocket = () => {
        ws.current = new WebSocket(
            'wss://free.blr2.piesocket.com/v3/1?api_key=oFGep6TlZyyDrDqwS8IktAIWWkzTwxpqUzmDNyaN&notify_self=1',
        );

        ws.current.onopen = () => {
            console.log('connected');
            setIsConnected(true);
        };

        ws.current.onclose = () => {
            console.log('disconnected');
            setIsConnected(false);

            setTimeout(connectToWebSocket, reconnectDelay);
        };

        ws.current.onerror = (e) => {
            // @ts-ignore
            console.log('error:', e.message);
        };

        ws.current.onmessage = (e) => {
            const incomingMessage = e.data;
            console.log(incomingMessage);
            setServerMessages(JSON.parse(incomingMessage));
        };
    };

    useEffect(() => {
        connectToWebSocket();
        fetchLiveMatches();

        return () => {
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                ws.current.close();
            }
        };
    }, []);

    return (
        <SafeAreaView>
            <Text>{JSON.stringify(isConnected)}</Text>
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={
                            <RefreshControl
                                refreshing={false}
                                onRefresh={handleRefresh}
                            />
                        }
            >
                {
                    serverMessages && serverMessages.length > 0 ? (
                        <View>
                            {serverMessages && serverMessages.length > 0 && serverMessages.map((item: any) => {
                                return (
                                    <Text>{JSON.stringify(item)}</Text>
                                )
                            })}
                        </View>
                    ) : (
                        <View>
                            {liveMatches && liveMatches.map((item: any, index) => {
                                let team1_score = `${item.scorecard?.team1.marks}/${item.scorecard?.team1.wickets}`
                                let team2_score = `${item.scorecard?.team2.marks}/${item.scorecard?.team2.wickets}`
                                let overs_T1 = `${item.scorecard?.team1.overs}.${item.scorecard?.team1.balls}`
                                let overs_T2 = `${item.scorecard?.team2.overs}.${item.scorecard?.team2.balls}`
                                return (
                                    <MatchDetailCard
                                        key={index}
                                        matchStatus={MatchStatus.Live}
                                        team1={item.team1}
                                        team2={item.team2}
                                        team1Score={team1_score}
                                        team2Score={team2_score}
                                        team1Image={PATHS.IMAGES.Team_1}
                                        team2Image={PATHS.IMAGES.Team_2}
                                        matchNo={item.match_no}
                                        overs_T1={overs_T1}
                                        overs_T2={overs_T2}
                                    />
                                )
                            })}
                        </View>
                    )
                }
            </ScrollView>
        </SafeAreaView>
    )
}