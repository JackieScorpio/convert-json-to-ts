export default function (str = "") {
    str = str.trim();
    if (
        !(
            (str[0] === "{" && str.slice(-1) === "}") ||
            (str[0] === "[" && str.slice(-1) === "]")
        )
    ) {
        return "{}";
    }

    const SYMBOLS = {
        LEFT_BRACE: "&#40;",
        RIGHT_BRACE: "&#41;",
    };

    // replace braces to prevent function call
    str = str.replace("(", SYMBOLS.LEFT_BRACE).replace(")", SYMBOLS.RIGHT_BRACE);

    return JSON.stringify(new Function('', `return ${str};`)())
        .replace(SYMBOLS.LEFT_BRACE, "(")
        .replace(SYMBOLS.RIGHT_BRACE, ")");
}
