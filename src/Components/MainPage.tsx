import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MainQuestion from './MainQuestion';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    flexGrow: 1,
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  submitBtn:{
  
  }
}));

const MainPage = () => {
  const classes = useStyles();

  const [questNumber, setQuestNumber] = React.useState<number>(5)
  const [showQuiz, setShowQuiz] = React.useState<boolean>(false)
  const [level, setLevel] = React.useState<string>('easy')

  const questions:number[] = [5,10,20,30,40,50]
  const difficultyLevel:string[] = ['easy', 'medium','difficult']

  const handleQuestionNumber = (event: any) => {
      console.log(event.target)
    setQuestNumber(event.target.value)
  };

  const handleDifficultyLevel = (event: any) => {
    setLevel(event.target.value)
  };

  const startQuiz = ()=>{
    setShowQuiz(true)
  }

  if(showQuiz)
  {
      return(
          <MainQuestion level={level} questionNumber={questNumber}></MainQuestion>
      )
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={3}></Grid>
        <Grid item xs={9}>
          <Typography variant="h3" component="h4">
            Quiz App
          </Typography>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={9}>
          <Typography variant="h5" component="h6" color="primary">
            Select Options
          </Typography>
        </Grid>
      </Grid>
      <form onSubmit={()=>startQuiz()}>
        <Grid container spacing={2}>
          <Grid item xs={3}></Grid>
          <Grid item xs={9}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">Number of Questions</InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                value={questNumber}
                onChange={handleQuestionNumber}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {questions.map((item:number, index:number)=>{
                return <MenuItem key={index} value={item}>{item}</MenuItem>
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={9}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">Difficulty Level</InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                value={level}
                onChange={handleDifficultyLevel}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {difficultyLevel.map((item:string, index:number)=>{
                return <MenuItem key={index} value={item}>{item}</MenuItem>
                })}
              </Select>
            </FormControl>
          </Grid>   
          <Grid item xs={3}></Grid>
          <Grid item xs={9}>
            <Button className={classes.submitBtn} type="submit" variant="outlined" color="primary">
                Start Quiz
            </Button>
          </Grid> 
        </Grid> 
      </form>
    </div> 
  );
}

export default MainPage