import React, { useState, useEffect } from "react";

function Timer({ startTimerValue = 24 }) {
    const initTimeLeft = () => {
        const initialTimeInSeconds = startTimerValue * 60 * 60; // 24 hours in seconds
        const storedTime = parseInt(localStorage.getItem('countdownTime'));
        const lastUpdateTime = parseInt(localStorage.getItem('lastUpdateTime'));
        const currentTime = Math.floor(Date.now() / 1000);

        if (storedTime && lastUpdateTime) {
            const elapsedSeconds = currentTime - lastUpdateTime;
            const remainingTime = storedTime - elapsedSeconds;
            return remainingTime > 0 ? remainingTime : 0;
        }

        return initialTimeInSeconds;
    };
    const [timeLeft, setTimeLeft] = useState(initTimeLeft);

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimeLeft((prevTime) => {
                const newTime = prevTime - 1;
                localStorage.setItem('countdownTime', newTime.toString());
                localStorage.setItem('lastUpdateTime', Math.floor(Date.now() / 1000).toString());

                // Clear interval and reset time when countdown reaches 0
                if (newTime === 0) {
                    clearInterval(timerInterval);
                    localStorage.removeItem('countdownTime');
                    localStorage.removeItem('lastUpdateTime');
                }

                return newTime;
            });
        }, 1000);

        const handleBeforeUnload = () => {
            localStorage.setItem('lastUpdateTime', Math.floor(Date.now() / 1000).toString());
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            clearInterval(timerInterval);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);


    const formatValue = (value) => {
        return String(value).padStart(2, "0")
    }

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${formatValue(hours)} : ${formatValue(minutes)} : ${formatValue(remainingSeconds)}`;
    };

    return (
        <div>
            <div>Time Left: {formatTime(timeLeft)}</div>
        </div>
    );
};

export default Timer;
