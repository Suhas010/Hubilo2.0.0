import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { selectedQuestion } from '../actions/index';
import { selectUser, correctAns, wrongAns } from '../actions/index'
import strings from '../../../utils/constants';

/**
 * Global style constants
 */
const styles = {
    block: {
      maxWidth: 250,
    },
    checkbox: {
      marginBottom: 16,
    },
  };

/**
 * @description Main components of our app. Rrenders questions and all processing done here
 * @author Suhas R More
 * @class Test
 * @extends {Component}
 */
class Test extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            activeQno : this.props.activeQno ? this.props.activeQno >5 ? 1 : this.props.activeQno : 1,
            checked: false,
            finished: false,
            stepIndex: 0,
            selectedAns:1,
            correct: 0,
            wrong: 0,
            optionSelected: null,
            
        }
    }
    /**
     * @description 
     * @author Suhas R More
     * @memberof Test
     */
    componentWillMount(){
        console.log(this.state.activeQno);
        // I know this is very bad idea to set correct and wrong ans to 0 if cureent Q no is 1
        // but this is how I reset the state which was stored on localStorage
        // because if user take test second time after finishing correct and wrong ans start incrementing
        // from previous values to avoid this I restored score to 0    
        if(this.state.activeQno == 1){
            this.props.correctAns(0);
            this.props.wrongAns(0);
        }
        window.scroll(0,0);
    }

    /**
     * @description Handels click of Next buttons. checks whether selected options is write or wrong and accordingly
     * inctement state count to show on Result page
     * @author Suhas R More
     * @memberof Test
     */
    handleNext() {
        const stepIndex = this.state.activeQno;
        console.log("correct",this.state.selectedAns,this.props.questions[stepIndex]);
        this.props.selectedQuestion(stepIndex+1);
        this.setState({
          finished: stepIndex >= this.props.questions.length,
          activeQno: stepIndex + 1
        },() => {
          
            if(this.state.selectedAns == this.props.questions[stepIndex-1].ans && !this.state.finished){
                // If ans is correct correct prop will be incremented
                this.props.correctAns(this.props.correct+1);
                console.log("correct");
                this.setState({
                    optionSelected: null
                })
            
            } else {
                // If ans is wrong wrong prop will be incremented
                this.props.wrongAns(this.props.wrong+1);
                console.log("wrong");
            }

        });
    };

    /**
     * @description Handles click of Back click. checks whether this is first q or not if yes disables click of back
     * @author Suhas R More
     * @memberof Test
     */
    handlePrev () {
        //if user click on preview and retake Q code is not able to handle this scenario
        // and consider it is as fresh Q and attepmt to increment correct ot wrong prop
        // 
        // If user ans 5 Q correct and retake last Q and ans it wrong final result will be 5 correct and 1 wrong which 
        // is wrong method
        if (this.state.activeQno > 0) {
            this.props.selectedQuestion(this.state.activeQno-1);
            this.setState({
                activeQno: this.state.activeQno - 1,
                
            });
        }
    };

    /**
     * @description handle click of Radio button. If option is not selected next click is disabled
     * @author Suhas R More
     * @param {any} e 
     * @param {any} v 
     * @memberof Test
     */
    setAnswer(e,v){
       
        this.setState({
           selectedAns: v,
           optionSelected:true,
       })

    }

    /**
     * @description renders active qestion along with options depending on next and back click
     * @author Suhas R More
     * @returns 
     * @memberof Test
     */
    renderActiveQestion() {
        /**
         * Style for Question container div
         */
        const style = {
            paddingLeft: "20%",
            paddingRight: "20%",
            paddingTop:"2%"
        }

        return this.props.questions.map((question) => {

           if(this.state.activeQno == question.id){
                return (
                    <div style={style} key={question.id}>
        
                        <Card key={question.id} zDepth={3}>
                            <CardTitle title={question.q}  />
                            <CardText>
                            <RadioButtonGroup name="shipSpeed" onChange={this.setAnswer.bind(this)} >
                                
                                {/* renders all option of active question*/}
                                {question.opt.map((o) =>{
                                    return(
                                        <RadioButton
                                        key={o.id}
                                        value={o.id}
                                        label={o.opt}
                                     
                                      />
                                        
                                    );
                                })}
                            </RadioButtonGroup>    
                            </CardText>
                        </Card>       
        
                    </div>
                );
            } 
            
        });
    } 
    
    render() {
        
        const stepIndex = this.state.activeQno-1;
        
        const style = {
            paddingLeft: "45%",
            paddingRight: "25%"
        }
        
        const stepperStyle = {
            paddingRight:"20%",
            paddingLeft:"20%",
           
        }
        
        const PaperStyle = {
            height: 65,
            fontWeight: "900",
            fontSize: "40px",
            width: "95%",
            margin: 20,
            backgroundColor:"#009A81",
            color:"#ffff",
            padding:10,
            textAlign: 'center',
            display: 'inline-block',
          };
        
        {/* if test is not yet fineshed we'll show question according to active qestion no else we'll show result page to the user*/}
        
        if(!this.state.finished){
        
            return (
                <div>
                    <div>
                        <Paper style={PaperStyle} zDepth={3} >
                            {strings.header}
                        </Paper>
                    </div>
                    
                    {this.renderActiveQestion()}
                    
                    <div style={stepperStyle}>
                        <Stepper activeStep={stepIndex}>
                            
                            {
                                this.props.questions.map((Q)=>{
            
                                    return(
                                        <Step key={Q.id}>
                                            <StepLabel>{strings.questions} {Q.id}</StepLabel>
                                        </Step>
                                    );
                                })
                            }
                            
                        </Stepper>

                    </div>

                    <div style={style}>
                        <div style={{marginTop: 12}}>
                            
                            <RaisedButton
                                label={strings.pre}
                                icon={<ArrowBack/>}
                                disabled={stepIndex === 0}
                                onClick={this.handlePrev.bind(this)}
                                style={{marginRight: 20}}
                                secondary={true}
                            />
                            
                            <RaisedButton
                                label={this.state.activeQno == this.props.questions.length ? strings.finish : strings.next}
                                primary={true}
                                disabled={this.state.optionSelected == null? true:false}
                                labelPosition="before"
                                onClick={this.handleNext.bind(this)}
                                icon={<ArrowForward/>}
                            />

                        </div>
                    </div>
                </div>   
            );

        } else {
            
            return(
            
                <div style={stepperStyle}>
                    
                    <Card >
                        <CardTitle title={strings.finishMsg}  />    
                        <CardText>          
                            {strings.correct}  {this.props.correct}<br/>
                            {strings.wrong}  {this.props.wrong}
                        </CardText>
                    
                    </Card>
                
                </div> 
            )
        }    
    }

}

function mapStateToProps(state) {
    return {
        questions: state.questions,
        activeQno: state.activeQ,
        correct: state.correct,
        wrong: state.wrong

    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators ({
            selectedQuestion : selectedQuestion,
            correctAns,
            wrongAns,
        
        }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Test);
