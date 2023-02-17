const fs = require('fs-extra');

// QuizId
let quizId = "./quizzes/Settings.yaml";

function resetDocument() {
    fs.writeFile(quizId, "", (err) => {
        if (err) {
            console.log(err);
        }
    });
}

function writeStructure() {
    let structure = "id: anatomy-and-physiology\ntitle: 'Anatomy and Physiology'\nquestions:\n";
    fs.writeFile(quizId, structure, (err) => {
        if (err) {
            console.log(err);
        }
    });
}

function readAndWriteQuestion() {
    let questionDataFile = "./question-data/question-data.csv";
    fs.readFile(questionDataFile, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        let dataByRow = data.split('\n');
        for (let index = 0; index < dataByRow.length; index++) {
            const data = dataByRow[index];

            let dataByColumn = data.split(',');
                if (index != 0) {
                    let lastQuestionText = dataByRow[index - 1].split(',')[1];

                    if (dataByColumn[1] != lastQuestionText) {
                        writeQuestionText(dataByColumn[1]);
                    }
                } else {
                    writeQuestionText(dataByColumn[1]);
                }
                writeAnswer(dataByColumn[2], dataByColumn[dataByColumn.length - 1]);
            console.log(dataByColumn[0] + ". " + dataByColumn[1]);
        }
    });
}

function writeQuestionText(questionTextData) {
    let questionText = `    -\n        text: '${questionTextData}'\n        options:\n`;
    fs.appendFileSync(quizId, questionText, (err) => {
        if (err) {
            console.log(err);
        }
    });
}

function writeAnswer(answerTextData, correctData) {
    correct = (correctData == 1) ? true : false;
    let answer = `            -\n                correct: ${correct}\n                value: '${answerTextData}'\n`;
    fs.appendFileSync(quizId, answer, (err) => {
        if (err) {
            console.log(err);
        }
    });
}

function main() {
    resetDocument();
    writeStructure();
    readAndWriteQuestion();
}

main();

// TODO: Yaml-Datei versuchen hochzuladen 
