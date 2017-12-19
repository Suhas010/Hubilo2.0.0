export default function(state = null, action){
    console.log(action,"***");
    
    switch(action.type){
        case 'WRONG_ANS':
         return action.payload;
    }
    return state;
}