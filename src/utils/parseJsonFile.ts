/**
 * License: zlib/libpng
 * @author Santo Pfingsten
 * @see https://github.com/Lusito/web-ext-translator
 */

import { JsonTokenizer } from "./JsonTokenizer";

type JsonValue = string | number | null | boolean | object;

function parseArray(tokenizer: JsonTokenizer) {
    const result: JsonValue[] = [];
    do {
        result.push(parseValue(tokenizer));
    } while (tokenizer.testCharToken(","));
    tokenizer.expectCharToken("]");
    return result;
}

function parseObject(tokenizer: JsonTokenizer) {
    const result = {};
    do {
        const key = tokenizer.tryValueToken("string");
        if (key === undefined)
            break;
        tokenizer.expectCharToken(":");
        result[key] = parseValue(tokenizer);
    } while (tokenizer.testCharToken(","));
    tokenizer.expectCharToken("}");
    return result;
}

function parseValue(tokenizer: JsonTokenizer): JsonValue {
    const token = tokenizer.skipComments();
    switch (token.type) {
        case "string":
        case "number":
        case "boolean":
        case "null":
            return token.content;
        case "char":
            if (token.content === "[")
                return parseArray(tokenizer);
            else if (token.content === "{")
                return parseObject(tokenizer);
            else
                throw new Error(`Unexpected token '${token.content}' at ${tokenizer.getTokenPosition()}`);
    }
    throw new Error(`Unexpected token type '${token.type}' at ${tokenizer.getTokenPosition()}`);
}

export function parseJsonFile(resource: string, fileContent: string) {
    return parseValue(new JsonTokenizer(resource, fileContent));
}
