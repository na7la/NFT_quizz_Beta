const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
   
    {
        question: "What's a smart contract ?",
        choice1: "A digital contract where all the terms and conditions are set up with computer code",
        choice2: " A contract who run on smartphone",
        choice3: " A consensus mechanism",
        choice4: "None of above",
        answer: 1,
    },
    {
        question: "Metamask is:",
        choice1: "A Google Chrome plugin",
        choice2: "A crypto asset wallet",
        choice3: "A wallet for ERC 20 token",
        choice4: "is a metallic mask sold as NFT",
        answer: 2,
    },
    {
        question: "Which coding languages are essential for you to learn to make an NFT?",
        choice1: "Solidity",
        choice2: "None, in platforms such as OpenSea, You don't need any line of code",
        choice3: "C++",
        choice4: "Javascript",
        answer: 2,
    },
    {
        question: "What is DeFi short for?",
        choice1: "Don't forget",
        choice2: "Decentralized file",
        choice3: "Decentralized finance",
        choice4: "Dependable function",
        answer: 3,
    },
    {
        question: "In 2013, who created Ethereum?",
        choice1: "Satoshi Nakamoto",
        choice2: "Vitalic Butterin",
        choice3: "Elon Musk",
        choice4: "El Mouldi",
        answer: 2,
    },
    {
        question: "What's the difference between Ether & Ethereum ?",
        choice1: "Ether is the name of the smart contract of Ethereum",
        choice2: "Ether is a hard fork of Ethereum",
        choice3: "It's the same thing",
        choice4: "Ether is the currency of Ethereum",
        answer: 4,
    },
    {
        question: "Opensea.org is:",
        choice1: "An organisation who  defend, conserve and protect our oceans",
        choice2: "A marketplace to buy & sell NFT's",
        choice3: "A seafood dish in a restaurant",
        choice4: "An crypto exchange platform",
        answer: 2,
    },
    {
        question: "What's a crypto  wallet?",
        choice1: "Is where to trade crypto assets",
        choice2: "It can contain only coins & tokens ",
        choice3: "Is where to store crypto assets",
        choice4: "None of above",
        answer: 3,
    },
    {
        question: "What does it mean to mint an NFT?",
        choice1: "it's miners who mint NFT's",
        choice2: "Creation and registration of the nft  on the blockchain ",
        choice3: "Selling an NFT",
        choice4: "None of above",
        answer: 2,
    },
    {
        question: "What's the Ethereum NFT protocol?",
        choice1: "ERC 20",
        choice2: "ERC 721 ",
        choice3: "TRC 20",
        choice4: "None of above",
        answer: 2,
    },
    {
        question: "What's an NFT?",
        choice1: "A form of digital art",
        choice2: "A digital art piece with a unique sellable identity.",
        choice3: "A monkey design or an 8 pixel design",
        choice4: "None of above",
        answer: 2,
    },
    {
        question: "what is the particularity of nft's compared to other digital art files?",
        choice1: "Authenticity.",
        choice2: "F#ck, their price are extremely high.",
        choice3: "Can be only made with a community.",
        choice4: "can be sold on twitter",
        answer: 1,
    },
    {
        question: "What's make NFT's so valuable?",
        choice1: "their design are special.",
        choice2: "it can be sold only one time.",
        choice3: "they are all on the Ethereum blockchain.",
        choice4: "their rarity.",
        answer: 4,
    },
    {
        question: "What's NFT collection?",
        choice1: "A collection of 10 000 NFT's.",
        choice2: "All the NFT bought by one user.",
        choice3: "NFT's that have own storyline, values, goals and ways of communicating.",
        choice4: "A bunch a different NFT's.",
        answer: 3,
    },
    {
        question: "How 10 000 collections are made?",
        choice1: "Made one by one.",
        choice2: "Outsourced in China.",
        choice3: "algorithmically generated.",
        choice4: "It's impossible to make 10 000 NFT's.",
        answer: 3,
    },
    {
        question: "What's IPFS protocol?",
        choice1: "A torrent protocol.",
        choice2: "A peer 2 peer for centralized systems.",
        choice3: "A new generation of IP adress.",
        choice4: "InterPlanetary File System for distributed systems.",
        answer: 4,
    },

    {
        question: "What's a blockchain?",
        choice1: "A useful tool in a fight.",
        choice2: "A database that is shared across a network of computers.",
        choice3: "Is where to exchange tokens.",
        choice4: "A centralized database.",
        answer: 2,
    }
    
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 16

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/NFT_quizz_Beta/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()