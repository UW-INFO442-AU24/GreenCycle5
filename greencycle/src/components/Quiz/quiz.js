import React, { useState, useEffect } from 'react';

function Quiz() {
    // Correct Answers (for reference)
    const correctAnswers = {
        q1: "B",
        q2: "C",
        q3: "B",
        q4: "B",
        q5: "A",
        q6: "A",
        q7: "B",
        q8: "D",
        q9: "C",
        q10: "B",
        q11: "D",
        q12: "A",
        q13: "A",
        q14: "B",
        q15: "B"
    };

    // Questions and Answers Data
    const questionsData = [
        {
            question: "Which of the following materials can typically be recycled?",
            answers: [
                { text: "Pizza boxes with grease stains", value: "A" },
                { text: "Glass bottles", value: "B" },
                { text: "Tissues", value: "C" },
                { text: "Food wrappers", value: "D" }
            ],
            correct: "B"
        },
        {
            question: "What does the recycling symbol with the number '1' inside typically represent?",
            answers: [
                { text: "Paper", value: "A" },
                { text: "Aluminum", value: "B" },
                { text: "Plastic (PET)", value: "C" },
                { text: "Glass", value: "D" }
            ],
            correct: "C"
        },
        {
            question: "Which of these items should not be placed in a recycling bin?",
            answers: [
                { text: "Aluminum cans", value: "A" },
                { text: "Broken glass", value: "B" },
                { text: "Cardboard", value: "C" },
                { text: "Plastic bottles", value: "D" }
            ],
            correct: "B"
        },
        {
            question: "What is a common reason for contamination in recycling bins?",
            answers: [
                { text: "Mixing food waste with recyclables", value: "A" },
                { text: "Not having enough bins", value: "B" },
                { text: "Using incorrect recycling symbols", value: "C" },
                { text: "Using clear plastic bags", value: "D" }
            ],
            correct: "A"
        },
        {
            question: "What is the main purpose of recycling paper?",
            answers: [
                { text: "To create new paper products", value: "A" },
                { text: "To reduce air pollution", value: "B" },
                { text: "To save water", value: "C" },
                { text: "To reduce waste in landfills", value: "D" }
            ],
            correct: "A"
        },
        {
            question: "What is the process of breaking down recyclable materials into raw materials for new products called?",
            answers: [
                { text: "Incineration", value: "A" },
                { text: "Reuse", value: "B" },
                { text: "Upcycling", value: "C" },
                { text: "Reprocessing", value: "D" }
            ],
            correct: "D"
        },
        {
            question: "What is 'e-waste?'",
            answers: [
                { text: "Waste from electronic devices like phones and computers", value: "A" },
                { text: "Waste from food packaging", value: "B" },
                { text: "Waste that can be composted", value: "C" },
                { text: "Waste generated from cleaning products", value: "D" }
            ],
            correct: "A"
        },
        {
            question: "Which of the following items is considered hazardous waste and should not go in your regular recycling bin?",
            answers: [
                { text: "Old batteries", value: "A" },
                { text: "Newspaper", value: "B" },
                { text: "Aluminum foil", value: "C" },
                { text: "Cardboard", value: "D" }
            ],
            correct: "A"
        },
        {
            question: "What should you do if you're unsure whether an item is recyclable?",
            answers: [
                { text: "Recycle it", value: "A" },
                { text: "Throw it in the trash", value: "B" },
                { text: "Leave it outside for a pickup", value: "C" },
                { text: "Burn it", value: "D" }
            ],
            correct: "B"
        },
        {
            question: "Which of these items is an example of a compostable material rather than a recyclable one?",
            answers: [
                { text: "Paper towel", value: "A" },
                { text: "Milk jug", value: "B" },
                { text: "Aluminum foil", value: "C" },
                { text: "Glass bottle", value: "D" }
            ],
            correct: "A"
        },
        {
            question: "Which of the following materials can take the longest to break down in a landfill, making recycling especially important?",
            answers: [
                { text: "Paper", value: "A" },
                { text: "Plastic bottles", value: "B" },
                { text: "Aluminum cans", value: "C" },
                { text: "Banana peels", value: "D" }
            ],
            correct: "B"
        },
        {
            question: "Which of the following is NOT a recyclable plastic?",
            answers: [
                { text: "PET (Polyethylene Terephthalate)", value: "A" },
                { text: "HDPE (High-Density Polyethylene)", value: "B" },
                { text: "PVC (Polyvinyl Chloride)", value: "C" },
                { text: "PLA (Polylactic Acid)", value: "D" }
            ],
            correct: "D"
        },
        {
            question: "How long does it typically take for a plastic bottle to decompose in a landfill?",
            answers: [
                { text: "10 years", value: "A" },
                { text: "100 years", value: "B" },
                { text: "1,000 years", value: "C" },
                { text: "10,000 years", value: "D" }
            ],
            correct: "C"
        },
        {
            question: "Why are some recycling programs starting to accept 'soft plastics' (e.g., chip bags, plastic wrappers)?",
            answers: [
                { text: "Soft plastics are easier to recycle than hard plastics", value: "A" },
                { text: "There are new technologies and methods to recycle soft plastics more efficiently", value: "B" },
                { text: "Soft plastics do not take up as much space in landfills", value: "C" },
                { text: "They decompose faster than hard plastics", value: "D" }
            ],
            correct: "B"
        },
        {
            question: "What is a common obstacle to more widespread recycling?",
            answers: [
                { text: "Lack of materials to recycle", value: "A" },
                { text: "Confusion about what can and cannot be recycled", value: "B" },
                { text: "Recycling costs more than producing new materials", value: "C" },
                { text: "Recycling processes release harmful chemicals", value: "D" }
            ],
            correct: "B"
        },
    ];

    // State to track the user's answers, the current question index, and the screen state
    const [answers, setAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isQuizStarted, setIsQuizStarted] = useState(false);
    const [questions, setQuestions] = useState([]); // Store shuffled questions

    const shuffleArray = (array) => {
        return array.map(value => ({ value, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .map(({ value }) => value);
    };

    useEffect(() => {
        if (isQuizStarted) {
            // Shuffle and set the questions once the quiz starts
            const shuffledQuestions = shuffleArray(questionsData);
            const shuffledQuestionsWithAnswers = shuffledQuestions.map(question => ({
                ...question,
                answers: shuffleArray(question.answers)
            }));
            setQuestions(shuffledQuestionsWithAnswers);
        }
    }, [isQuizStarted]);

    const handleAnswerChange = (questionIndex, selectedValue) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [`q${questionIndex}`]: selectedValue
        }));
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(prevIndex => Math.min(prevIndex + 1, questions.length - 1));
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex(prevIndex => Math.max(prevIndex - 1, 0));
    };

    const calculateScore = () => {
        let score = 0;
        let results = [];

        questions.forEach((question, index) => {
            const selectedAnswer = answers[`q${index + 1}`];

            const selectedAnswerText = question.answers.find(ans => ans.value === selectedAnswer)?.text;

            if (selectedAnswer === question.correct) {
                score++;
                results.push({
                    question: question.question,
                    selected: selectedAnswerText,
                    correct: true,
                    correctAnswerText: question.answers.find(ans => ans.value === question.correct).text
                });
            } else {
                results.push({
                    question: question.question,
                    selected: selectedAnswerText,
                    correct: false,
                    correctAnswerText: question.answers.find(ans => ans.value === question.correct).text
                });
            }
        });

        setShowResult(true);
        setAnswers({
            score,
            results
        });
    };

    const renderWelcomeScreen = () => {
        return (
            <div id="welcome-screen">
                <h1>Recycling Quiz</h1>
                <p>Test your knowledge on recycling!</p>
                <button onClick={() => setIsQuizStarted(true)}>Start Quiz</button>
            </div>
        );
    };

    const renderQuiz = () => {
        if (!questions || questions.length === 0) {
            return <div>Loading quiz...</div>;
        }

        const question = questions[currentQuestionIndex];

        return (
            <div id="quiz-section">
                <h1>Recycling Quiz</h1>
                <div className="question">
                    <h3>{`${currentQuestionIndex + 1}. ${question.question}`}</h3>
                    <ul className="answers">
                        {question.answers.map(answer => (
                            <li key={answer.value}>
                                <label>
                                    <input
                                        type="radio"
                                        name={`q${currentQuestionIndex + 1}`}
                                        value={answer.value}
                                        onChange={() => handleAnswerChange(currentQuestionIndex + 1, answer.value)}
                                        checked={answers[`q${currentQuestionIndex + 1}`] === answer.value}
                                    />
                                    {answer.text}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="navigation">
                    {currentQuestionIndex > 0 && (
                        <button onClick={handlePreviousQuestion}>Previous</button>
                    )}
                    {currentQuestionIndex < questions.length - 1 && (
                        <button onClick={handleNextQuestion}>Next</button>
                    )}
                    {currentQuestionIndex === questions.length - 1 && (
                        <button onClick={calculateScore}>Submit</button>
                    )}
                </div>
            </div>
        );
    };

    const renderResult = () => {
        return (
            <div className="result-popup">
                <h2>Your Results</h2>
                <p>Score: {answers.score} / {questions.length}</p>
                <ul>
                    {answers.results.map((result, index) => (
                        <li key={index} style={{ color: result.correct ? 'green' : 'red' }}>
                            <strong>{result.correct ? 'Correct' : 'Incorrect'}:</strong> {result.question}
                            <br />
                            Your answer: {result.selected}
                            {result.correct ? null : (
                                <>
                                    <br />
                                    <strong>Correct answer:</strong> {result.correctAnswerText}
                                </>
                            )}
                        </li>
                    ))}
                </ul>
                <button onClick={resetQuiz}>Close</button>
            </div>
        );
    };

    const resetQuiz = () => {
        setIsQuizStarted(false); // Return to welcome screen
        setAnswers({}); // Clear answers
        setShowResult(false); // Hide result popup
        setCurrentQuestionIndex(0); // Reset to first question
        setQuestions([]); // Clear questions
    };

    return (
        <div id="quiz-container">
            {isQuizStarted ? (
                <>
                    {renderQuiz()}
                    {showResult && (
                        <div className="overlay">
                            {renderResult()}
                        </div>
                    )}
                </>
            ) : (
                renderWelcomeScreen()
            )}
        </div>
    );
}

export default Quiz;