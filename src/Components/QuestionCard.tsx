import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {QuestionPropsType} from '../Types/quiz-types'


const useStyles = makeStyles((theme) =>({
  root: {
    display: 'table',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    width: '600px',
    textAlign: 'center',
    marginTop: 20
  },
  formControl: {
    margin: theme.spacing(3),
    
  },
  button: {
    
  },
}));

const QuestionCard: React.FC<QuestionPropsType> = ({item, serial, callback, result}) =>{
  const classes = useStyles();

  const [selectedAnswer, setSelectedAnswer] = React.useState<string>('') 
  const [helperText, setHelperText] = React.useState<string>('Choose Answer') 

  const handleChange = (e:any)=>{
    
    setSelectedAnswer(e.target.value)
    
    if(e.target.value === item.answer){
      setHelperText('Correct')
    }
    else{
      setHelperText('Incorrect')
    }
  }

  const handleSubmit = (e: React.FormEvent<EventTarget>) =>{
     callback(e, selectedAnswer)
     setHelperText('Choose Answer')
  }

  if(result.showResult)
    return(
        <Card className={classes.root}>
            <CardActionArea>
                <CardContent>
                <Typography gutterBottom variant="h4" component="h3">
                    Your score is {result.score}  out of {result.total}
                </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )

  return (
          
          <Card className={classes.root}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h6" component="h5">
                  Question {serial}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <form onSubmit={(e)=>handleSubmit(e)}>
                <FormControl component="fieldset"  className={classes.formControl}>
                  <FormLabel component="legend">
                    <Typography variant="h5" component="h4" color="textPrimary" style={{textAlign:'left'}}>
                          {item.question}
                    </Typography>
                  </FormLabel>
                  <RadioGroup aria-label="quiz" name="quiz" > 
                      {item.options.map((option:string, index:number)=>{
                            return (<FormControlLabel key={index} value={option} onChange={(e)=>handleChange(e)} control={<Radio required={true}/>} label={<Typography variant="h6" component="h6" color="textSecondary">{option}</Typography>} /> )  
                      })}
                  </RadioGroup>
                  <FormHelperText>{helperText}</FormHelperText>
                  <Button type="submit" size="medium" variant="outlined" color="primary" className={classes.button}>
                      Next
                  </Button>
                </FormControl>
              </form>  
            </CardActions>
          </Card>
       );
}

export default QuestionCard