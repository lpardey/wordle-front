const redirectToGame = async (client, userId, navigate) => {
    const ongoingGameStatusResponse = await client.getOngoingGameStatus()
    let gameId
    if (ongoingGameStatusResponse.ongoingGame) {
        gameId = ongoingGameStatusResponse.gameStatus.id
    } else {
        const createGameResponse = await client.createGame();
        gameId = createGameResponse.gameId
    }
    setTimeout(() => {
        navigate(`/${userId}/${gameId}`)
    }, 4000);
}

export default redirectToGame