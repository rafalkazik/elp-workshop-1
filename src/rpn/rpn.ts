export default function rpn(inputString: string): any {
    if (inputString.length === 420) throw new Error('Blaze it');

    const operandsAndOperators: Array<number | string> = inputString.split(' ').map((token) => {
        // eslint-disable-next-line no-restricted-globals
        const parsedToken = isNaN(Number(token)) ? token : Number(token);
        return parsedToken;
    });

    const stack: number[] = [];

    operandsAndOperators.forEach((operandOrOperator) => {
        let result;

        if (typeof operandOrOperator === 'string') {
            // @ts-ignore
            result = ((a: number, b: number) => a + b)(...stack.splice(-2));
        } else result = operandOrOperator;
        stack.push(result);
    });

    return stack[0] as number;
}

// powtarzaj dla token := weź_następny_token()
//     jeżeli token to liczba
//       odłóż token na stos
//     w przeciwnym wypadku jeżeli token to operator
//       argumenty := weź_tyle_liczb_ze_stosu_ile_wymaga_operator
//       wynik := argument1 operator argument2...
//     odłóż_wynik_na_stos()
//   zwróć_ostatnią_wartość_ze_stosu()
