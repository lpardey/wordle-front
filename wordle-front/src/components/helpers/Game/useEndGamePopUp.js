import useToggle from "../../../hooks/useToggle"
import { useEffect } from "react"

const useEndGamePopUpLogic = (currentStatus, gameIsOver) => {
    const [endGamePopUp, toggleEndGamePopUp] = useToggle(false)

    const useEndGamePopUpLogicEffect = () => {
        useEffect(() => {
            if (gameIsOver) {
                toggleEndGamePopUp()
            }
        }, [currentStatus])
    }

    return [endGamePopUp, toggleEndGamePopUp, useEndGamePopUpLogicEffect];
}

export default useEndGamePopUpLogic;