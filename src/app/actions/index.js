/**
 * App actions goes here. I am Just using single action for easy and earlier task completion..sorry
 * @param {} user 
 */

export const selectUser = (user) => {
    return {
        type: 'USER_SELECTED',
        payload: user
    }
};

export const correctAns = (correct) =>{
    return{
        type: 'CORRECT_ANS',
        payload: correct
    }
}

export const wrongAns = (wrong) =>{
    return{
        type: 'WRONG_ANS',
        payload: wrong
    }
}
export function selectedQuestion(question){
    //console.log("selected question",question.q);
    return{
        type: 'SELECTED_QUESTION',
        payload: question
    }
}