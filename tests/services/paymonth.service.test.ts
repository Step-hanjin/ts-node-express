import { PaymonthService }  from '../../src/services/paymonth.service';
import { AppDataSource } from '../../src/data-source';
import { Paymonth } from '../../src/models/paymonth';
import { Repository } from 'typeorm';

jest.mock('../../src/data-source', () => ({
    AppDataSource: {
        getRepository: jest.fn(),
    },
}));

describe('PaymonthService', () => {
    let mockRepo: jest.Mocked<Repository<Paymonth>>;
    let paymonthService: PaymonthService;

    beforeEach(() => {
        mockRepo = {
            find: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        } as any;
        (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepo);
        paymonthService = new PaymonthService();
    });

    it('getPaymonths : should find all paymonths', async () => {
        const mockPaymonths = [
            {
                id: 2, 
                month: '2025-4',
                start_time: '2025/4/3 12:12 AM',
                end_time: '2025/4/3 12:12 AM',
            }
        ] as Paymonth[];
        mockRepo.find.mockResolvedValue(mockPaymonths);

        const paymonths = await paymonthService.getPaymonths();

        expect(paymonths).toEqual(mockPaymonths);
        expect(mockRepo.find).toHaveBeenCalled();
    });

  
    it('getPaymonths : should find all paymonths', async () => {
        const mockPaymonths = [
            {id: 1, month: 'Paymonth1'}, 
            {id: 2, month: 'Paymonth2'}
        ] as Paymonth[];
        mockRepo.find.mockResolvedValue(mockPaymonths);

        const paymonths = await paymonthService.getPaymonths();

        expect(paymonths).toEqual(mockPaymonths);
        expect(mockRepo.find).toHaveBeenCalled();
    });

    it('getPaymonthById : should return paymonth by id', async () => {
        const mockPaymonth: Paymonth = {
            id: 1, 
            month: '2025-3',
            start_time: '2025/4/3 12:12 AM',
            end_time: '2025/4/3 12:12 AM',
        };
        mockRepo.findOneBy.mockResolvedValue(mockPaymonth);
    
        const result = await paymonthService.getPaymonthById(1);
        expect(result).toEqual(mockPaymonth);
        expect(mockRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('createPaymonth : should create and return a paymonth', async () => {
        const newPaymonth: Paymonth = {
            id: 1, 
            month: '2025-3',
            start_time: '2025/4/3 12:12 AM',
            end_time: '2025/4/3 12:12 AM',
        };
        mockRepo.save.mockResolvedValue(newPaymonth);
    
        const result = await paymonthService.createPaymonth(newPaymonth);
        expect(result).toEqual(newPaymonth);
        expect(mockRepo.save).toHaveBeenCalledWith(newPaymonth);
      });

      it('updatePaymonth : should update a paymonth and return updated value', async () => {
        const updatedPaymonth: Paymonth = {
            id: 1, 
            month: '2025-3',
            start_time: '2025/4/3 12:12 AM',
            end_time: '2025/4/3 12:12 AM',
        };
        mockRepo.update.mockResolvedValue({} as any);
        mockRepo.findOneBy.mockResolvedValue(updatedPaymonth);
    
        const result = await paymonthService.updatePaymonth(3, updatedPaymonth);
        expect(mockRepo.update).toHaveBeenCalledWith(3, updatedPaymonth);
        expect(result).toEqual(updatedPaymonth);
      });
    
      it('deletePaymonth : should delete a paymonth and return true', async () => {
        mockRepo.delete.mockResolvedValue({} as any);
    
        const result = await paymonthService.deletePaymonth(4);
        expect(mockRepo.delete).toHaveBeenCalledWith(4);
        expect(result).toBe(true);
      });
});