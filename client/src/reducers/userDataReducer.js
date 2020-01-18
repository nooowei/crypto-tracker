// loading the user data once retrieved from backend DB
const userData = (state = {}, action) => {
    switch (action.type) {
      case "LOAD_USER":
        return action.user;
      default:
        return state
    }
  }
  
export default userData;