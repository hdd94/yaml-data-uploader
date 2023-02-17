const fs = require('fs-extra');

let pathPrefix= "./quizzes/";

const quizzes = [
    { "id": 'anatomy-and-physiology', "title": 'Anatomy and Physiology' },
    { "id": 'nutrition-in-sport', "title": 'Nutrition in Sport' },
    { "id": 'practical-exercises', "title": 'Practical Exercises' },
    { "id": 'training-in-practice', "title": 'Training in Practice' },
    { "id": 'training-instruction', "title": 'Training Instruction' },
    { "id": 'training-under-control', "title": 'Training under Control' }
]

function main() {
    for (const quiz of quizzes) {
        generateYamlFile(quiz);
    }
}

async function generateYamlFile(quiz) {
    await resetDocument(quiz.id);
    writeStructure(quiz.id, quiz.title);
    readAndWriteQuestion(quiz.id);
}

async function resetDocument(quizId) {
    await fs.outputFile(`${pathPrefix}${quizId}.yaml`, "");
}

function writeStructure(quizId, quizTitle) {
    let structure = `id: ${quizId}\ntitle: '${quizTitle}'\nquestions:\n`;
    fs.writeFile(`${pathPrefix}${quizId}.yaml`, structure, (err) => {
        if (err) {
            console.log(err);
        }
    });
}

function readAndWriteQuestion(quizId) {
    fs.readFile(`./sql-data/${quizId}.csv`, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        let dataByRow = data.split('\n');
        for (let index = 0; index < dataByRow.length; index++) {
            const data = dataByRow[index];

            let dataByColumn = data.split(',');

            decideWriteQuestion(index, dataByRow, dataByColumn, quizId);
            writeAnswer(dataByColumn[2], dataByColumn[dataByColumn.length - 1], quizId);
            console.log(dataByColumn[0] + ". " + dataByColumn[1]);
        }
    });
}

function decideWriteQuestion(index, dataByRow, dataByColumn, quizId) {
    if (index != 0) {
        let lastQuestionText = dataByRow[index - 1].split(',')[1];

        if (dataByColumn[1] != lastQuestionText) {
            writeQuestionText(dataByColumn[1], quizId);
        }
    } else {
        writeQuestionText(dataByColumn[1], quizId);
    }
}

function writeQuestionText(questionTextData, quizId) {
    let questionText = `    -\n        text: '${questionTextData}'\n        options:\n`;
    fs.appendFileSync(`${pathPrefix}${quizId}.yaml`, questionText, (err) => {
        if (err) {
            console.log(err);
        }
    });
}

function writeAnswer(answerTextData, correctData, quizId) {
    correct = (correctData == 1) ? true : false;
    let answer = `            -\n                correct: ${correct}\n                value: '${answerTextData}'\n`;
    fs.appendFileSync(`${pathPrefix}${quizId}.yaml`, answer, (err) => {
        if (err) {
            console.log(err);
        }
    });
}

main();