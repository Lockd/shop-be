import { isUuidValid } from '../utils/misc';

describe('check if uuid validation works properly', () => {
  it('uuid is some string, function should return false', () => {
    expect(isUuidValid('qwe')).toBe(false);
  })
  it('uuid is empty, function should return false', () => {
    expect(isUuidValid('')).toBe(false);
  })
  it('uuid is 9f95af9e-7087-41ec-ba49-6815d4834780, function should return true', () => {
    expect(isUuidValid('9f95af9e-7087-41ec-ba49-6815d4834780')).toBe(true);
  })
  it('uuid is 4204ba77-e5db-436f-ad8a-b53ec858c705, function should return true', () => {
    expect(isUuidValid('4204ba77-e5db-436f-ad8a-b53ec858c705')).toBe(true);
  })
})
