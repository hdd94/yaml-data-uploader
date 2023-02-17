const fs = require('fs-extra');

// QuizId
let quizId = "./Settings.yaml";

// QuestionDataFile
let questionDataFile = "./QuestionData.txt";

// Structure
let structure = "id: anatomy-and-physiology\ntitle: 'Anatomy and Physiology'\nquestions:\n";

// Question Template
let question1 = "    -\n        text: 'Which of the following are parts of a cell?'\n        options:\n" +
    "            -\n                correct: true\n                value: 'cell body'\n" +
    "            -\n                correct: true\n                value: 'cell nucleus'\n" +
    "            -\n                correct: true\n                value: 'cell membrane'\n" +
    "            -\n                correct: false\n                value: 'cell stem'\n";


function readAndWriteQuestion() {
    fs.readFile(questionDataFile, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        let dataByRow = data.split('\n');
        for (let index = 0; index < dataByRow.length; index++) {
            const data = dataByRow[index];

            let dataByColumn = data.split(',');

            // if (dataByColumn.length != 4) {
            //     // let lastQuestionId = dataByRow[index - 1].split(',')[0]
            //     // if(dataByColumn[0] != lastQuestionId)
            //     console.log(dataByColumn[0] + ". " + dataByColumn.length);

            //     // Besondere Behandlung
            //     switch (dataByColumn[0]) {
            //         case 12: 

            //             break;
            //     }
            // } else {
            // Für jede QuestionText x-mal ausführen

            // }
            if (dataByColumn.length != 4) {
                let lastQuestionId = dataByRow[index - 1].split(',')[0];
                if (dataByColumn[0] != lastQuestionId) {
                    console.log(dataByColumn.length + ' ' + dataByColumn[0]);
                }
            }
            if (dataByColumn.length != 4) {
                if (!dataByColumn[1].endsWith('.' || '?' || '…' || '...')) {
                    let concatenatedQuestionText = dataByColumn.slice(1, 3).toString();
                    if (index != 0) {
                        let lastQuestionText = dataByRow[index - 1].split(',')[1];
    
                        if (dataByColumn[1] != lastQuestionText) {
                            if (dataByColumn[0] == 139) {
                                writeQuestionText(dataByColumn.slice(1, 2).toString());
                            } else {
                                writeQuestionText(concatenatedQuestionText);
                            }
                        }
                    } else {
                        writeQuestionText(concatenatedQuestionText);
                    }
                    // WARNING: Refactoring notwendig, nicht auf eine Frage begrenzen 
                    if (dataByColumn[0] == 231) {
                        writeAnswer(dataByColumn[3] + ', ' + dataByColumn[4], dataByColumn[dataByColumn.length - 1]);
                    } else if (dataByColumn[0] == 139) {
                        writeAnswer(dataByColumn.slice(2, dataByColumn.length - 1).toString(), dataByColumn[dataByColumn.length - 1]);
                    } 
                    else {
                        writeAnswer(dataByColumn[dataByColumn.length - 2], dataByColumn[dataByColumn.length - 1]);
                    }
                }
                else {
                    let concatenatedAnswerText = dataByColumn.slice(2, dataByColumn.length - 1).toString();
                    writeAnswer(concatenatedAnswerText, dataByColumn[dataByColumn.length - 1]);
                }
            } else {
                if (index != 0) {
                    let lastQuestionText = dataByRow[index - 1].split(',')[1];

                    if (dataByColumn[1] != lastQuestionText) {
                        writeQuestionText(dataByColumn[1]);
                    }
                } else {
                    writeQuestionText(dataByColumn[1]);
                }

                writeAnswer(dataByColumn[2], dataByColumn[dataByColumn.length - 1]);
            }
            // console.log(dataByColumn[0] + ". " + dataByColumn[1]);
        }
    });
}

function resetDocument() {
    fs.writeFile(quizId, "", (err) => {
        if (err) {
            console.log(err);
        }
    });
}

function writeStructure() {
    fs.writeFile(quizId, structure, (err) => {
        if (err) {
            console.log(err);
        }
    });
}

function writeQuestionText(questionText) {
    fs.appendFileSync(quizId, getQuestionText(questionText), (err) => {
        if (err) {
            console.log(err);
        }
    });
}

function writeAnswer(answerText, correct) {
    correct = (correct == 1) ? true : false;
    fs.appendFileSync(quizId, getAnswer(answerText, correct), (err) => {
        if (err) {
            console.log(err);
        }
    });
}

function getQuestionText(questionDataText) {
    let questionText = `    -\n        text: '${questionDataText}'\n        options:\n`;
    return questionText;
}

function getAnswer(answerText, correct) {
    let answer = `            -\n                correct: ${correct}\n                value: '${answerText}'\n`;
    return answer;
}

function main() {
    resetDocument();
    writeStructure();
    readAndWriteQuestion();
    // writeQuestion(question1);
}

main();



// Text: ["Text A", "Text B", "Text C"];
// Correct


// TODO: Yaml-Datei versuchen hochzuladen 
