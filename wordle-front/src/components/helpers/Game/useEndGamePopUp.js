import useToggle from "../../../hooks/useToggle"
import { useEffect } from "react"

const useEndGamePopUpLogic = (currentStatus, gameIsOver, gameWord) => {
    const [endGamePopUp, toggleEndGamePopUp] = useToggle(false)
    const endGameMessage = `'${gameWord}' is the word for this game.`

    const useEndGamePopUpLogicEffect = () => {
        useEffect(() => {
            if (gameIsOver) {
                toggleEndGamePopUp()
            }
        }, [currentStatus])
    }

    return [endGamePopUp, toggleEndGamePopUp, endGameMessage, useEndGamePopUpLogicEffect];
}

export default useEndGamePopUpLogic;