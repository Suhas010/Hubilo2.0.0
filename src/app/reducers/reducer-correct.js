export default function(state = null, action){
    console.log(action,"***");
    
    switch(action.type){
        case 'CORRECT_ANS':
         return action.payload;
    }
    return state;
}