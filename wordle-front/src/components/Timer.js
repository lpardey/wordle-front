import React, { useState, useRef, useEffect } from "react";

function Timer({ initialTimer = "24:00:00" }) {
    const intervalRef = useRef(null);

    const calculateTimeRemaining = (expiryTime) => {
        const totalMilliseconds = Date.parse(expiryTime) - Date.now();
        const seconds = Math.floor((totalMilliseconds / 1000) % 60);
        const minutes = Math.floor((totalMilliseconds / 1000 / 60) % 60);
        const hours = Math.floor((totalMilliseconds / 1000 / 60 / 60) % 24);
        return {
            totalMilliseconds,
            hours,
            minutes,
            seconds,
        };
    };

    const formatTime = (value) => String(value).padStart(2, "0");

    const updateTimer = (expiryTime) => {
        const { hours, minutes, seconds } = calculateTimeRemaining(expiryTime);
        const formattedTimer = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
        setTimer(formattedTimer);
        localStorage.setItem("timerValue", formattedTimer); // Save to localStorage
    };

    const [timer, setTimer] = useState(() => {
        const storedTimerValue = localStorage.getItem("timerValue");
        return storedTimerValue || initialTimer;
    });

    const startTimer = (expiryTime) => {
        clearInterval(intervalRef.current);
        updateTimer(expiryTime);
        intervalRef.current = setInterval(() => updateTimer(expiryTime), 1000);
    };

    const clearTimer = (expiryTime) => {
        setTimer("24:00:00");
        localStorage.setItem("timerValue", "24:00:00"); // Save to localStorage
        clearInterval(intervalRef.current);
        startTimer(expiryTime);
    };

    const getDeadline = () => {
        const deadline = new Date();
        deadline.setHours(deadline.getHours() + 24);
        return deadline;
    };

    useEffect(() => {
        const deadline = getDeadline();
        clearTimer(deadline);

        return () => clearInterval(intervalRef.current); // Cleanup interval on component unmount
    }, []);

    return <div>{timer}</div>;
}


export default Timer;
