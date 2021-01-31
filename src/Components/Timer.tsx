import  React,{useEffect, useState} from 'react';
import {TimerPropType, TimerLeft} from '../Types/quiz-types'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useWebAnimations, {flash} from "@wellyshen/use-web-animations";

const useStyles = makeStyles((theme) =>({
  root: {
    display: 'table',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    width: '600px',
    textAlign: 'center',
    marginTop: 100
  },
  alertLess: {
    display: 'table',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    width: '600px',
    textAlign: 'center',
    color:'red',
    marginTop: 100
  }
}));

const calculateTimeLeft = (d: Date, timeInSeconds: number) => {
  let startDate:number = d.getTime() + (timeInSeconds * 1000)
  let newDate:number = new Date().getTime()
  let difference:number = startDate - newDate 
  let timeLeft:TimerLeft = {days:0, hours:0, minutes:0, seconds: 0};
  
  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }
  return timeLeft;
}

const Timer:React.FC<TimerPropType> = ({date, timeInSeconds, nextQuestionCallback}) => {

   const [timeLeft, setTimeLeft] = useState<TimerLeft>(calculateTimeLeft(new Date(), timeInSeconds));
   const classes = useStyles();
   const { ref, getAnimation } = useWebAnimations({...flash})

   useEffect(() => {
    const timer=setTimeout(() => {
     if(timeLeft.hours || timeLeft.minutes || timeLeft.seconds)
        setTimeLeft(calculateTimeLeft(date, timeInSeconds));
     else{
      nextQuestionCallback()
      setTimeLeft(calculateTimeLeft(new Date(), timeInSeconds));
     }
    }, 1000);
    // Clear timeout if the component is unmounted
    return (() => {
      clearTimeout(timer)
    }
    );
  }, [timeLeft]);

  return( 
    <div className={timeLeft.seconds<5?classes.alertLess:classes.root} ref={ref}>
      <Typography gutterBottom variant="h5" component="h4">
          {"Time Left "} { timeLeft.seconds} {"seconds "}
      </Typography>
     {timeLeft.seconds < 5? getAnimation()?.play():getAnimation()?.pause()}
    </div>
  ) 

  
}

export default Timer;
