/**
 * Retrives the value from a nested object based on a dot-separated path string.
 * 
 * This utility function safely navigates through an object using tke keys
 * specified in `path`. It supports accessting deeply nested values without 
 * throwig errors if intermediate properties are `undefined` or `null` 
 * 
 * @param {Record<string, any>} obj - The object to extract the vlaue from.
 * @param {string} path - The dot-notated string representing the path to the value (e.g, "country.which.area") 
 * @returns {*} - The value at the specified path, or `undefined` if any part of the path is invalid
 * 
 * @example
 * const user = { profile: { name: 'Alice' } };
 * getNestedValue(user, 'profile.name'); // "Alice"
 * 
 */
export const getNestedValue = (obj: Record<string, any>, path: string): any => {
    return path.split('.').reduce((acc, field) => acc?.[field], obj);
}
