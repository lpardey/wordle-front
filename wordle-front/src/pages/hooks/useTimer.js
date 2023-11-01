import { useState, useEffect } from "react";

import { useState, useEffect } from "react";

export default function useTimer(initialDate, durationInHours) {
    const targetTime = new Date(initialDate);
    targetTime.setHours(targetTime.getHours() + durationInHours);

    const [remainingTime, setRemainingTime] = useState(targetTime - new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 1000);

            if (remainingTime <= 0) {
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [remainingTime]);

    const hours = Math.floor(remainingTime / 3600000);
    const minutes = Math.floor((remainingTime % 3600000) / 60000);
    const seconds = Math.floor((remainingTime % 60000) / 1000);

    return [hours, minutes, seconds];
}
