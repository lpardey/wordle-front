import React, { useState, useEffect } from "react";

function Timer({ startTimerValue = 24, gameId, gameFinishedDate }) {
    const countdownTimeKey = `game_${gameId}_${gameFinishedDate}`
    const lastUpdateTimeKey = `${countdownTimeKey}_lastUpdateTime`
    const initTimeLeft = () => {
        const initialTimeInSeconds = startTimerValue * 60 * 60; // 24 hours in seconds
        const storedTime = parseInt(localStorage.getItem(countdownTimeKey));
        const lastUpdateTime = parseInt(localStorage.getItem(lastUpdateTimeKey));
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
                localStorage.setItem(countdownTimeKey, newTime.toString());
                localStorage.setItem(lastUpdateTimeKey, Math.floor(Date.now() / 1000).toString());

                // Clear interval and reset time when countdown reaches 0
                if (newTime === 0) {
                    clearInterval(timerInterval);
                    localStorage.removeItem(countdownTimeKey);
                    localStorage.removeItem(lastUpdateTimeKey);
                }

                return newTime;
            });
        }, 1000);

        const handleBeforeUnload = () => {
            localStorage.setItem(lastUpdateTimeKey, Math.floor(Date.now() / 1000).toString());
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            clearInterval(timerInterval);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [countdownTimeKey, lastUpdateTimeKey]);


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
            <div>Next game starts in: {formatTime(timeLeft)}</div>
        </div>
    );
};

export default Timer;
