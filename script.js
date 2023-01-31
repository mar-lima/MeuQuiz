const log = (el) =>(console.log(el));
const doc = (el) =>(document.querySelector(el));
const docAll = (el) =>(document.querySelectorAll(el));


//Initial data
let descriptionHtml = '';
let currentQueston = 0;
let correctAnswers = 0;
let score = 0;

doc('.scoreArea button').addEventListener('click', resetEvent)

showQuestion();

//Functions
function showQuestion() {
    if (quiz[currentQueston]) {
        let q = quiz[currentQueston];

        let pct = Math.floor((currentQueston / quiz.length) * 100);

        doc('.progress--bar').style.width = `${pct}%`;

        doc('.scoreArea').style.display = 'none';
        doc('.questionArea').style.display = 'block';

        doc('.question').innerHTML = q.question;
        

        let optionsHtml = '';
        
        for (let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span> ${q.options[i]}</div>`;       
            
        }

        
        
        doc('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });
    } 
    else {
       finishQuiz()
       
    }
}
// Opções e respostas

function optionClickEvent(e) {
    
    let clickedOption = parseInt(e.target.getAttribute('data-op'));
    
    
    
    
    if (quiz[currentQueston].answer === clickedOption) {
        
        score += 10
        docAll('.option')[clickedOption].style.background = '#1d1c26';
        doc('.scocre-pts').innerHTML = `Pontos: ${score}`
        correctAnswers++;      
        
    } 
    if (currentQueston >= quiz.length) {
        // currentQueston = 0;
        finishQuiz(); 
    }
    else {   
        finishQuiz(); 
    }  
    currentQueston++;
    showQuestion()  
}

function finishQuiz() {
    let points = Math.floor((correctAnswers / quiz.length) * 100);

    doc('.scorePct').innerHTML = `Acertou ${points}%`

    doc('.scoreArea').style.display = 'block';
    doc('.questionArea').style.display = 'none';
    doc('.progress--bar').style.width = '100%';

    doc('.scoreText2').innerHTML = `Você respondeu ${quiz.length} Questões e acertou ${correctAnswers}.`
    
    if (points <= 0 && points <= 33 ) {
        doc('.scoreText1').innerHTML = "você foi muito Mal Precisa Melhorar!"
        doc('.scorePct').style.color = 'red'
    }
    else if(points >= 34 && points <= 65) {
        doc('.scoreText1').innerHTML = "Muito bem mas precisa melhorar!"
        doc('.scorePct').style.color = 'yellow'
        
    }
    else if(points >= 66 && points <= 99) {
        doc('.scoreText1').innerHTML = "você sabe muito foi quase perfeito!"
        doc('.scorePct').style.color = 'b3ff02'
        
    }
    else if(points == 100) {
        doc('.scoreText1').innerHTML = "Pefeito você acertou todas!"
        doc('.scorePct').style.color = 'green'

    }
}

function resetEvent() {
    correctAnswers = 0;
    currentQueston = 0;
    showQuestion();
}

// function questionsRandom() {
//     let max = quiz.length;
//     const random = (min, ) => Math.floor(Math.random()  * (min));
    
//     let currentQueston = random(max)
//     let q = quiz[currentQueston].options

// }
// questionsRandom()







