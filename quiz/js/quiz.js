// // // alert();
// // var allQuestion= [];
// // let index = 0;
// // let questionEl = document.querySelector(".question-el");
// // const getQuestionFunc = ()=>{
// //     // let data = ;
// // }
// var allOptionEl = document.querySelectorAll(".option");
// var nextBtn = document.querySelector(".next-btn");

// nextBtn.onclick = function(){
//     var ans = getAnswer();
//     if (ans) {
//         alert("Selected " + ans);
//     } else {
//         alert("No option selected!");
//     }
// }

// const getAnswer = () =>{
//     var answer;
//     allOptionEl.forEach((input)=>{
//         if(input.checked){
//             answer =  input.value;
//         }
//     });
//     return answer;
// }

//CHATGPT
// Store questions and answers in an array
var questions = [
    {
        question: "What is the full form of DCN?",
        options: ["Digital Computer Node", "Distributed Control Network", "Data Communication Network", "Dynamic Connection Network"],
        correct: "Data Communication Network"
    },
    {
        question: "What is the full form of LAN?",
        options: [" Large Area Network", "Local Area Network", "Long-range Area Network", "Linked Access Network"],
        correct: "Local Area Network"
    },
    {
        question: "What is communication?",
        options: ["The process of sending data only in one direction","The exchange of information between two or more entities"," The storage of information in a database"," The process of analyzing data without sharing it"],
        correct: "The exchange of information between two or more entities"
    }
];

var currentQuestionIndex = 0; // Track the current question
var questionEl = document.querySelector(".question-el"); // Question element
var optionsContainer = document.querySelector(".main"); // Main container to update options
var nextBtn = document.querySelector(".next-btn"); // Next button

// Function to load a question
function loadQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    
    // Update the question text
    questionEl.innerHTML = `Q-${currentQuestionIndex + 1}: ${currentQuestion.question}`;

    // Generate options dynamically
    var optionsHtml = "";
    currentQuestion.options.forEach((option, index) => {
        optionsHtml += `
            <input type="radio" id="option-${index}" class="option" name="option" value="${option}">
            <label for="option-${index}">${option}</label><br><br>
        `;
    });

    // Update the HTML inside the main div (excluding the Next button)
    optionsContainer.innerHTML = `
        <h2 class="question-el">${questionEl.innerHTML}</h2><br>
        ${optionsHtml}
        <div align="end">
            <button class="btn next-btn btn-primary">Next</button>
        </div>
    `;

    // Reattach event listener to the new Next button
    document.querySelector(".next-btn").addEventListener("click", checkAnswer);
}

// Function to check the selected answer
function checkAnswer() {
    var selectedAnswer = document.querySelector("input[name='option']:checked");

    if (!selectedAnswer) {
        alert("⚠️ Please select an option.");
        return;
    }

    var userAnswer = selectedAnswer.value;
    var correctAnswer = questions[currentQuestionIndex].correct;
    var right=0;
    var wrong=0;
    var score=0;
    var index=0;

    if (userAnswer === correctAnswer) {
        right++;
        // alert(right);
        // alert("✅ Correct Answer!");
    } else {
        wrong++;
        // alert("❌ Wrong Answer! The correct answer is: " + correctAnswer);
    }
    index++;
    

    // Move to the next question
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion(); // Load the next question
    } else {
        alert("🎉 Quiz Completed!");
    }
    return index;
}

// Load the first question on page load
loadQuestion();
