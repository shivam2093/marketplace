export const initialState = null

export const reducer = (state, action) => {

    // console.log('reducer', action.payload)
    // switch (action.type) {
    //     case 'USER':
    //         return [
    //             ...state,
    //             {
    //                 user: action.payload.user,
    //                 img: action.payload.img
    //             }
    //         ]
    //     case 'CLEAR':
    //         return;
    //     default:
    //         return state;
    // }
    //hello 

    if (action.type == "USER") {
    
        return  action.payload 
    }
    if (action.type == "CLEAR") {
        return null;
    }

    return state;

    
}

