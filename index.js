import inquirer from "inquirer";
const api = "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple";
const fetchData = async (data) => {
    try {
        const fetchData = await fetch(data);
        const jsonData = await fetchData.json();
        return jsonData.results; // accessing 'results' property which contains the array of questions
    }
    catch (error) {
        console.error('Error fetching data:', error);
        return null; // or handle the error in a suitable way
    }
};
const startQuiz = async () => {
    try {
        const data = await fetchData(api);
        if (!data) {
            console.log("Failed to fetch quiz data.");
            return;
        }
        let score = 0;
        // Get user's name
        const { username } = await inquirer.prompt([
            {
                name: 'username',
                type: 'input',
                message: 'What is your Name?',
            }
        ]);
        // Display quiz questions
        for (let i = 0; i < data.length; i++) {
            const questionObj = data[i];
            const answers = [...questionObj.incorrect_answers, questionObj.correct_answer];
            const userAnswer = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'quiz',
                    message: questionObj.question,
                    choices: answers,
                }
            ]);
            if (userAnswer.quiz === questionObj.correct_answer) {
                score++;
            }
        }
        console.log(`Hi ${username}, your score is: ${score}`);
    }
    catch (error) {
        console.error('Error in quiz:', error);
    }
};
startQuiz();
