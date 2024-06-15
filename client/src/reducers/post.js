const postReducer = (state = {data:null}, action) => {
    switch(action.type){
        case 'FETCH_POSTS':
            // console.log(state)
            return {...state, data:action.payload}
        default:
            return state
    }
}

export default postReducer