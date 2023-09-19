import Box from "@mui/material/Box";

export default function GameBoard({ guesses, maxAttempts }) {
    for (let guessIndex = 0; guessIndex < maxAttempts; guessIndex++) {
        guesses[guessIndex].word.split("").map((letter, letterIndex) => (
            <Box
                display={"flex"}
                border={1}
                boxSizing={"content-box"}
                width={60}
                height={50}
                textAlign={"center"}
                alignItems="center"
                justifyContent={"center"}
                fontSize={50}
                color={"white"}
                sx={{ backgroundColor: getBackgroundColor(guesses[guessIndex].letters_status[letterIndex]) }}
            >
                {letter}
            </Box>
        ))
    }
}


const getBackgroundColor = (number) => {
    return number === 0 ? "#D76161" : number === 1 ? "#61D78C" : "#797979"
}


const showGameBoard2 = (guesses, maxAttempts) => {
    for (let guessIndex = 0; guessIndex < maxAttempts; guessIndex++) {
        try {
            let word = guesses[guessIndex] ? guesses[guessIndex].word : 5
            Array(word).forEach(element =>
                <Box
                    display={"flex"}
                    border={1}
                    boxSizing={"content-box"}
                    width={60}
                    height={50}
                    textAlign={"center"}
                    alignItems="center"
                    justifyContent={"center"}
                    fontSize={50}
                    color={"white"}
                    sx={{ backgroundColor: getBackgroundColor(guesses[guessIndex].letters_status[word.indexOf(element)]) }}
                >
                    {element}
                </Box>
            )
        } catch (error) {
            Array(5).forEach(element =>
                <Box
                    display={"flex"}
                    border={1}
                    boxSizing={"content-box"}
                    width={60}
                    height={50}
                    textAlign={"center"}
                    alignItems="center"
                    justifyContent={"center"}
                    fontSize={50}
                    color={"white"}
                    sx={{ backgroundColor: getBackgroundColor(2) }}
                >
                </Box>
            )

        }
    }
}

const showGameBoard = (guesses, maxAttempts) => {
    let word = guesses[0].word
    Array(word).forEach(element =>
        <Box
            display={"flex"}
            border={1}
            boxSizing={"content-box"}
            width={60}
            height={50}
            textAlign={"center"}
            alignItems="center"
            justifyContent={"center"}
            fontSize={50}
            color={"white"}
            sx={{ backgroundColor: getBackgroundColor(guesses[0].letters_status[word.indexOf(element)]) }}
        >
            {element}
        </Box>
    )

}

// {guesses.forEach((element) => element.word.split("").map((letter, letterIndex) => (
//     <Box
//         display={"flex"}
//         border={1}
//         boxSizing={"content-box"}
//         width={60}
//         height={50}
//         textAlign={"center"}
//         alignItems="center"
//         justifyContent={"center"}
//         fontSize={50}
//         color={"white"}
//         sx={{ backgroundColor: getBackgroundColor(element.letters_status[letterIndex]) }}
//     >
//         {letter}
//     </Box>
// )))}