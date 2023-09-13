### The goal of this project is to practice testing hooks since they work a bit different than components

## Procedures
- Test the following features of the useLocalStorage hook:
- Ensure the initial value passed to the useLocalStorage hook is stored in localStorage. This should also work with passing a function to useLocalStorage as well.
- Ensure localStorage is updated whenever setValue is called.
- Ensure localStorage is cleared whenever setValue is called with undefined.
- Ensure useLocalStorage uses the value from localStorage if it exists instead of the initial value passed to useLocalStorage.