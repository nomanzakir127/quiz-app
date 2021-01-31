export type Quiz = {
    category: string,
    type: string,
    difficulty:string,
    question: string,
    correct_answer: string,
    incorrect_answers : string[]

}

export type Question = {
    question: string,
    options: string[],
    answer: string
}

export type QuestionPropsType = {
    item: Question,
    serial: number,
    callback: (e:React.FormEvent<EventTarget>, ans:string) => void,
    result: Result
}

export type Result = {
    score: number,
    total : number,
    showResult: boolean
}

export type TimerPropType = {
    date:Date,
    timeInSeconds: number,
    nextQuestionCallback: () => void
}

export type QuestionPagePropType = {
    level: string,
    questionNumber: number
}

export type TimerLeft = {
    days: number,
    hours: number,
    minutes: number,
    seconds: number
}