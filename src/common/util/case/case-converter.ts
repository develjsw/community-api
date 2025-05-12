import { camelCase, snakeCase } from 'change-case';

export class CaseConverter {
    static snakeToCamel(data: Record<string, any>): Record<string, any> {
        return Object.fromEntries(Object.entries(data).map(([key, val]) => [camelCase(key), val]));
    }

    static camelToSnake(data: Record<string, any>): Record<string, any> {
        return Object.fromEntries(Object.entries(data).map(([key, val]) => [snakeCase(key), val]));
    }
}
