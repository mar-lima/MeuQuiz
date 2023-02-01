const log = (el) =>(console.log(el));
const doc = (el) =>(document.querySelector(el));
const docAll = (el) =>(document.querySelectorAll(el));


//Initial data
let descriptionHtml = '';
let currentQueston = 0;
let correctAnswers = 0;
let scoreT1 = 0;
let scoreT2 = 0;


// events click
doc('.scoreArea button').addEventListener('click', resetEvent)

// doc('.btn-tean-1').addEventListener('click', scoreTeam1)

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
    
    doc('.scocre-pts').innerHTML = '';    
    
    if (quiz[currentQueston].answer === clickedOption) {
        
        docAll('.option')[clickedOption].style.background = '#1d1c26';
        correctAnswers++;  
        doc('.scocre-pts').innerHTML = 'Correto';
        
        // POINTS TEAM
        if (currentQueston % 2 === 0 ) {
            scoreT1 +=10;

            doc('.team-1-points').innerHTML = `Pontuação: ${scoreT1 }`;

            doc('.turn-team').innerHTML = "Vez da equipe 2 ";    
        }
        if(currentQueston % 2 === 1  ){
            scoreT2 +=10;

            doc('.team-2-points').innerHTML = `Pontuação: ${scoreT2 }`
            doc('.turn-team').innerHTML = "Vez da equipe 1";
        }
        
    }
    // OPTION QUETIONS NOT CORRECTS
    else if (quiz[currentQueston].answer !== clickedOption) {

        docAll('.option')[clickedOption].style.background = '#1d1c26';
        doc('.scocre-pts').innerHTML = 'Errado';

        // POINTS TEAM
        if (currentQueston % 2 === 0 ) {
            
            console.log('if diferente par');

            doc('.team-1-points').innerHTML = `Pontuação: ${scoreT1 }`;

            doc('.turn-team').innerHTML = "Vez da equipe 2 ";    
        }
        if(currentQueston % 2 === 1){
            

            doc('.team-2-points').innerHTML = `Pontuação: ${scoreT2 }`
            doc('.turn-team').innerHTML = "Vez da equipe 1";
            console.log('if diferente impar');
        }
        console.log('if sdfsdfsdfsdf');
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
    
    if (points >= 0 && points <= 32 ) {
        doc('.scoreText1').innerHTML = "você foi muito Mal Precisa Melhorar!"
        doc('.scorePct').style.color = 'red'
    }
    else if(points >= 33 && points <= 65) {
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


// Reset variables and texts
function resetEvent() {
    correctAnswers = 0;
    currentQueston = 0;
    scoreT1 = 0;
    scoreT2 = 0;

    doc('.scocre-pts').innerHTML = 'Vamos Começar?'; 

    doc('.team-1-points').innerHTML = `Pontuação: ${ scoreT1 }`;
    doc('.team-2-points').innerHTML = `Pontuação: ${ scoreT2 }`;

    doc('.turn-team').innerHTML = "Equipe 1 inicia";
    showQuestion();
}

// score and tean points

// function scoreTeam() {

    
//     if (currentQueston % 2 === 0 && correctAnswers) {
//         scoreT1 +=10;
//         // log(currentQueston, 'no if')
        
//         doc('.team-1-points').innerHTML = `Pontuação: ${scoreT1 }`
//         log(correctAnswers)
        
//     }
//     else if(currentQueston % 2 !== 0  && correctAnswers){
//         scoreT2 +=10;
//         log('no else')
        
//         doc('.team-2-points').innerHTML = `Pontuação: ${scoreT1 }`
//     }
    
    
// }


//funtion random not used 
// function questionsRandom() {
//     let max = quiz.length;
//     const random = (min, ) => Math.floor(Math.random()  * (min));
    
//     let currentQueston = random(max)
//     let q = quiz[currentQueston].options

// }
// questionsRandom()






