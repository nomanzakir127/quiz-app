import  React,{useEffect, useState} from 'react';
import {getQuizDetails} from '../Services/fetchData';
import {Question, Result, QuestionPagePropType} from '../Types/quiz-types';
import '../App.css';
import QuestionCard from '../Components/QuestionCard';
import CircularIndeterminate from '../Components/CircularIndeterminate';
import Timer from '../Components/Timer';

const MainQuestion : React.FC<QuestionPagePropType> = ({level, questionNumber}) => {

   let [quiz, setQuiz] = useState<Question[]>([])
   let [currentIndex, setCurrentIndex] = useState<number>(0)
   let [score, setScore] = useState<number>(0)
   let [date, setDate] = useState<Date>(new Date())
   let [result, setResult] = useState<Result>({score:0, total: 0, showResult:false})
   
   useEffect(() => {
    
    async function fetchQuestions(){
        let questions:Question[]  = await getQuizDetails(questionNumber,level)
        setQuiz(questions)
    }
    fetchQuestions()
  }, [])

  const handleSubmit = (e: React.FormEvent<EventTarget>, selectedAnswer: string) => {
    e.preventDefault()

    if(selectedAnswer === quiz[currentIndex].answer)
      setScore(++score)
    
    nextQuestion()
  }

  const nextQuestion = () =>{
    if(currentIndex < quiz.length - 1)
    {
      setCurrentIndex(currentIndex + 1)
    }  
    else
    {
      let res:Result = {
        score : score,
        total : currentIndex + 1 ,
        showResult : true
      }
      setResult(res)
    }
    setDate(new Date())
  }

  if(!quiz.length)
    return (
      <div>
        <CircularIndeterminate></CircularIndeterminate>
      </div>
    );

  return (
    <div>
        {!result.showResult && (<Timer date={date} timeInSeconds={10} nextQuestionCallback={nextQuestion} />)}
        <QuestionCard item={quiz[currentIndex]} serial={currentIndex + 1} callback={handleSubmit} result={result}/>
    </div>
  );
}

export default MainQuestion;
