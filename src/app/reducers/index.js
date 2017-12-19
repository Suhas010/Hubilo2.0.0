import {combineReducers} from 'redux';
import questions from './reducer-users';
import activeQ from './reducer-activeq';
import correct from './reducer-correct';
import wrong from './reducer-wrong';

/**
 * combine all reducers here.   *** But we have used only one reducer here
 */
const allReducers = combineReducers({
    questions,
    activeQ,
    correct,
    wrong,

});

export default allReducers
