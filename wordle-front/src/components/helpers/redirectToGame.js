const redirectToGame = async (client, userId, navigate, timeout) => {
    const getLastGameResponse = await client.getLastGameStatus()
    const playAgain = localStorage.getItem("playAgain")
    let gameId

    if (getLastGameResponse.status === "FINISHED" && playAgain) {
        const createGameResponse = await client.createGame();
        gameId = createGameResponse.gameId
        localStorage.removeItem("playAgain")
    } else {
        gameId = getLastGameResponse.gameId
    }

    setTimeout(() => {
        navigate(`/${userId}/${gameId}`)
    }, timeout);
}

export default redirectToGame