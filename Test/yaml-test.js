const fs = require('fs-extra');

// QuizId
let quizId = "./Settings.yaml";

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
    let questionDataFile = "./QuestionData.txt";
    fs.readFile(questionDataFile, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        let dataByRow = data.split('\n');
        for (let index = 0; index < dataByRow.length; index++) {
            const data = dataByRow[index];

            let dataByColumn = data.split(',');

            // if (dataByColumn.length != 4) {
            //     if (!dataByColumn[1].endsWith('.' || '?' || '…' || '...')) {
            //         let concatenatedQuestionText = dataByColumn.slice(1, 3).toString();
            //         if (index != 0) {
            //             let lastQuestionText = dataByRow[index - 1].split(',')[1];
    
            //             if (dataByColumn[1] != lastQuestionText) {
            //                 if (dataByColumn[0] == 139) {
            //                     writeQuestionText(dataByColumn.slice(1, 2).toString());
            //                 } else {
            //                     writeQuestionText(concatenatedQuestionText);
            //                 }
            //             }
            //         } else {
            //             writeQuestionText(concatenatedQuestionText);
            //         }
            //         // WARNING: Refactoring notwendig, nicht auf eine Frage begrenzen 
            //         if (dataByColumn[0] == 231) {
            //             writeAnswer(dataByColumn[3] + ', ' + dataByColumn[4], dataByColumn[dataByColumn.length - 1]);
            //         } else if (dataByColumn[0] == 139) {
            //             writeAnswer(dataByColumn.slice(2, dataByColumn.length - 1).toString(), dataByColumn[dataByColumn.length - 1]);
            //         } 
            //         else {
            //             writeAnswer(dataByColumn[dataByColumn.length - 2], dataByColumn[dataByColumn.length - 1]);
            //         }
            //     }
            //     else {
            //         let concatenatedAnswerText = dataByColumn.slice(2, dataByColumn.length - 1).toString();
            //         writeAnswer(concatenatedAnswerText, dataByColumn[dataByColumn.length - 1]);
            //     }
            // } else {
                if (index != 0) {
                    let lastQuestionText = dataByRow[index - 1].split(',')[1];

                    if (dataByColumn[1] != lastQuestionText) {
                        writeQuestionText(dataByColumn[1]);
                    }
                } else {
                    writeQuestionText(dataByColumn[1]);
                }
                writeAnswer(dataByColumn[2], dataByColumn[dataByColumn.length - 1]);
            // }
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
