import {Quiz, Question} from './../Types/quiz-types'

function shuffleArray(array: any[]) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}
export const getQuizDetails = async(total:number, level:string):Promise<Question[]> => {
    const res = await fetch(`https://opentdb.com/api.php?amount=${total}&difficulty=${level}&type=multiple`)
    let {results} = await res.json()
    
    const quiz:Question[] = results.map((questionObj:Quiz)=>{
       return {
        question: questionObj.question,
        answer: questionObj.correct_answer,
        options: shuffleArray([...questionObj.incorrect_answers,questionObj.correct_answer])
       }
    })

    return quiz
}