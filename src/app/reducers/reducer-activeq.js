export default function(state = null, action){
    console.log(action,"***");
    
    switch(action.type){
        case 'SELECTED_QUESTION':
         return action.payload;

      }
    return state;
}