function createThunkMiddleware(extraArgument) {
    return ({ dispatch, getState }) => (next) => (Action) => {
        if (typeof Action === 'function') {
            return Action(dispatch, getState, extraArgument);
        }

        return next(Action);
    };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;


