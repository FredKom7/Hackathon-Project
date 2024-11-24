import { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { Line } from "react-chartjs-2";

const SessionAnalytics = () => {
    const [sessions, setSessions] = useState([]);
    const sessionCollectionRef = collection(db, "sessions");

    // Track session on login
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

    // Real-time listener for sessions
    useEffect(() => {
        const unsubscribe = onSnapshot(sessionCollectionRef, (snapshot) => {
            const sessionData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setSessions(sessionData);
        });

        // Track a session for a test user (example)
        trackSession("testUser123");

        // Cleanup listener on component unmount
        return () => unsubscribe();
    }, []);

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
                {sessions.map((session) => (
                    <li key={session.id}>
                        User ID: {session.userId} | Login Time: {session.loginTime} | Usage: {session.usageDuration} mins
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SessionAnalytics;
