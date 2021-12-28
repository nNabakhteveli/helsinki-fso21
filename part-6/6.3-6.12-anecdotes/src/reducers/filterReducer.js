
const notificationReducer = (state = [], action) =>  {
    switch(action.type) {
        case "FILTER":
            return action.data
                   
        default: return state;
    }
}

export default notificationReducer;