export class MockRepository {
  create = jest.fn().mockImplementation((data) => data);
  save = jest.fn().mockImplementation((data) => data);
  find = jest.fn().mockImplementation((data) => data);
  findOne = jest.fn().mockImplementation((data) => data);
  update = jest.fn().mockImplementation((data) => data);
  delete = jest.fn().mockImplementation((data) => data);
  remove = jest.fn().mockImplementation((data) => data);
}
