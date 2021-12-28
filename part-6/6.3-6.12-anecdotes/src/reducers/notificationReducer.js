
const notificationReducer = (state = 0, action) =>  {
    switch(action.type) {
        case "INCREMENT":
            if(state > 4) {
                state = 1;
                return state;
            } else {
                return state += 1;
            }
                   
        default: return state;
    }
}

export default notificationReducer;