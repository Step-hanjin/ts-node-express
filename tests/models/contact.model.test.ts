import { Contact } from '../../src/models/contact';
import { Country } from '../../src/models/country';

describe('Contact model', () => {
    it('should assign country relation properly', () => {
        const country = new Country()
        country.id = 1;
        country.name = "USA";

        const contact = new Contact();
        contact.name = "john";
        contact.email = "john@gmail.com";
        contact.phone = "1234567890";
        contact.note = "test note";
        contact.country = country;
        
        expect(contact.country).toBe(country);
        expect(contact.country.name).toBe("USA");
    });
});
