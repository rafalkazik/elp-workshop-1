export default function rpn(inputString: string): number {
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

// powtarzaj dla token := weź_następny_token()
//     jeżeli token to liczba
//       odłóż token na stos
//     w przeciwnym wypadku jeżeli token to operator
//       argumenty := weź_tyle_liczb_ze_stosu_ile_wymaga_operator
//       wynik := argument1 operator argument2...
//     odłóż_wynik_na_stos()
//   zwróć_ostatnią_wartość_ze_stosu()
