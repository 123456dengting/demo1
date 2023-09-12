const sum = (...args) => {
    return args.reduce((previous, current) => {
    return previous + current
    }, 0)
    }
    
    export default sum