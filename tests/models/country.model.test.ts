import { Contact } from '../../src/models/contact';
import { Country } from '../../src/models/country';

describe('Country model', () => {
    it("should assign contacts relation properly", () => {
        const contact = new Contact();
        contact.id = 1;
        contact.name = "John";
        contact.email = "john@example.com";
        contact.phone = "123456789";
        contact.note = "Some note";

        const country = new Country();
        country.id = 1;
        country.name = "USA";
        country.contacts = [contact];
        
        expect(country.contacts.length).toBe(1);
        expect(country.contacts?.[0].name).toBe("John");
    });
});
