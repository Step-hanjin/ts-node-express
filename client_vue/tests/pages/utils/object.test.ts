import { describe, it, expect } from "vitest";
import { getNestedValue } from '@/utils/object'

describe('getNestedValue', () => {
    it('should return the value at a simple path', () => {
        const obj = { name: 'Alice' };
        expect(getNestedValue(obj, 'name')).toBe('Alice');
    });

    it('should return the value at nested path', () => {
        const obj = { user: { profile: { name: 'Alice' } } };
        expect(getNestedValue(obj, 'user.profile.name')).toBe('Alice');
    });

    it('should return undefined for non-extisting path', () => {
        const obj = { user: { profile: {}}};
        expect(getNestedValue(obj, 'user.profile.name')).toBeUndefined();
    });
        
    it('should return undefined if intermediate property is null', () => {
        const obj = { user: null };
        expect(getNestedValue(obj, 'user.name')).toBeUndefined();
    });

    it('should return undefined if path is empty', () => {
        const obj = { user: { name: 'Charlie' } };
        expect(getNestedValue(obj, '')).toBeUndefined();
    });
});