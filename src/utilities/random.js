export const randomElements = (array, n) => array.sort(() => 0.5 - Math.random()).slice(0, n)

export const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

export const randomSimilarNumbers = (baseNumber) => {
    const min = Math.max(baseNumber - 2, 0);
    const max = baseNumber + 2;

    let firstNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    let secondNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    while (firstNumber === secondNumber || firstNumber === baseNumber || secondNumber === baseNumber) {
        firstNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        if (firstNumber !== baseNumber) {
            do {
                secondNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            } while (secondNumber === baseNumber || secondNumber === firstNumber);
        }
    }

    return [firstNumber, secondNumber];
}

export const randomizeSort = () => 0.5 - Math.random();
