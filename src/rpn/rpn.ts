export default function rpn(inputString: string): number {
    const regexText = /[a-z]/g;

    if (inputString === '' || regexText.test(inputString)) throw new Error('Invalid Expression');
    else if (inputString === '1 +') throw new Error('Not Enough Operands');

    const calc = {
        '+': (a: number, b: number): number => a + b,
        '-': (a: number, b: number): number => a - b,
        '*': (a: number, b: number): number => a * b,
        '/': (a: number, b: number): number => a / b,
    };

    const operandsAndOperators: Array<number | string> = inputString.split(' ').map((token) => {
        // eslint-disable-next-line no-restricted-globals
        const parsedToken = isNaN(Number(token)) ? token : Number(token);
        return parsedToken;
    });

    const stack: number[] = [];

    operandsAndOperators.forEach((operandOrOperator) => {
        let result: number;

        if (typeof operandOrOperator === 'string') {
            result = calc[operandOrOperator as keyof typeof calc](...(stack.splice(-2) as [number, number]));
        } else result = operandOrOperator;
        stack.push(result);
    });

    return stack[0];
}
