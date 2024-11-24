import { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { collection, addDoc, query, getDocs } from "firebase/firestore";
import { Line } from "react-chartjs-2";

const SessionAnalytics = () => {
    const [sessions, setSessions] = useState([]);
    const sessionCollectionRef = collection(db, "sessions");

    // Track session on login (this function is called when a user logs in)
    const trackSession = async (userId) => {
        const sessionData = {
            userId,
            loginTime: new Date().toISOString(),
            usageDuration: Math.floor(Math.random() * 60) + 1, // Simulated usage time in minutes
        };

        try {
            await addDoc(sessionCollectionRef, sessionData);
            console.log("Session tracked successfully");
        } catch (error) {
            console.error("Error tracking session:", error);
        }
    };

    // Fetch session data from Firestore
    const fetchSessions = async () => {
        const q = query(sessionCollectionRef);
        const querySnapshot = await getDocs(q);
        const sessionData = querySnapshot.docs.map((doc) => doc.data());
        setSessions(sessionData);
    };

    // Chart data preparation
    const chartData = {
        labels: sessions.map((session, index) => `Session ${index + 1}`),
        datasets: [
            {
                label: "Usage Duration (minutes)",
                data: sessions.map((session) => session.usageDuration),
                backgroundColor: "rgba(75, 192, 192, 0.4)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
            },
        ],
    };

    useEffect(() => {
        fetchSessions();
        // Simulate tracking a session for a test user
        trackSession("testUser123");
    }, []);

    return (
        <div>
            <h1>Session Analytics</h1>

            {/* Display Chart */}
            {sessions.length > 0 ? (
                <Line data={chartData} />
            ) : (
                <p>Loading session data...</p>
            )}

            {/* Display Session Details */}
            <h2>Session Details</h2>
            <ul>
                {sessions.map((session, index) => (
                    <li key={index}>
                        User ID: {session.userId} | Login Time: {session.loginTime} | Usage: {session.usageDuration} mins
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SessionAnalytics;
