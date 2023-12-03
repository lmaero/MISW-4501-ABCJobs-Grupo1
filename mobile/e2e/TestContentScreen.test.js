describe('Take a Candidate Test - Test Flow', () => {
  const testName = 'NestJS';
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('Test title is visible', async () => {
    await expect(element(by.id('test-content-title'))).toBeVisible();
  });

});
