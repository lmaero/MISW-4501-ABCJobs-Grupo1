describe('Candidate Register - Test Flow', () => {
  let emailRandom = `${Math.random().toString(36).substring(7)}@prueba.cl`;
  const password = '12345#MiswOnline';
  const fullName = 'Test Candidate';

  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    emailRandom = `${Math.random().toString(36).substring(7)}@test.co`;
    await device.reloadReactNative();
  });

  it('all candidate register label are visible', async () => {
    await expect(element(by.text('Email'))).toBeVisible();
    await expect(element(by.text('Password'))).toBeVisible();
    await expect(element(by.text('Full Name'))).toBeVisible();
    await expect(element(by.id('single-input-email'))).toBeVisible();
    await expect(element(by.id('single-input-password'))).toBeVisible();
    await expect(element(by.id('single-input-full-name'))).toBeVisible();
  });

  it('not register candidate because the form is empty', async () => {
    await element(by.text('Register')).tap();
    await expect(element(by.text('Email is required'))).toBeVisible();
    await expect(element(by.text('Password is required'))).toBeVisible();
    await expect(element(by.text('Full Name is required'))).toBeVisible();
  });

  it('not register candidate because the values not match with form validation', async () => {
    await element(by.id('single-input-email')).typeText('correo');
    await element(by.id('single-input-password')).typeText('12345');
    await element(by.id('show-password-icon')).tap();
    await element(by.id('single-input-full-name')).typeText('Test');
    await element(by.text('Register')).tap();
    await expect(element(by.text('Should be a valid email address'))).toBeVisible();
    await expect(element(by.text('Password must be between 8-16 characters'))).toBeVisible();
    await expect(element(by.text('Full Name should be two words separated by a space, with each word being 2-20 characters long'))).toBeVisible();
  });

  it('register candidate successfully', async () => {
    await element(by.id('single-input-email')).typeText(emailRandom);
    await element(by.id('single-input-password')).typeText(password);
    await element(by.id('show-password-icon')).tap();
    await element(by.id('single-input-full-name')).typeText(fullName);
    await element(by.text('Register')).tap();
    await expect(element(by.text('Complete your information'))).toBeVisible();
  });

  it('update candidate profile information successfully', async () => {
    await element(by.id('single-input-email')).typeText(emailRandom);
    await element(by.id('single-input-password')).typeText(password);
    await element(by.id('show-password-icon')).tap();
    await element(by.id('single-input-full-name')).typeText(fullName);
    await element(by.text('Register')).tap();
    await element(by.id('main-role-picker')).tap();
    await element(by.text('Backend')).tap();
    await element(by.id('description-input-spoken-languages')).typeText('English,Spanish\n');
    await element(by.id('description-input-main-soft-skills')).typeText('fastLearning,teamWork\n');
    await element(by.id('main-location-picker')).tap();
    await element(by.text('Argentina')).tap();
    await element(by.id('description-input-certifications')).typeText('AWS,React,NextJS\n');
    await element(by.id('description-input-edu-school-name-0')).typeText('Uniandes\n');
    await element(by.id('description-input-edu-obtained-degree-0')).typeText('Msc Computer Science\n');
    await element(by.id('description-input-edu-grade-0')).typeText('3.5\n');
    await element(by.id('description-input-tech-skills')).typeText('Git,Java,Python\n');
    await element(by.id('description-input-programming-languages')).typeText('Java,Python\n');
    await element(by.id('description-input-technical-data-roles')).typeText('TechLead\n');
    await element(by.id('description-input-years-of-experience')).typeText('5\n');
    await element(by.id('description-input-exp-title-0')).typeText('Computer Engineer\n');
    await element(by.id('description-input-exp-company-0')).typeText('Amazon\n');
    await element(by.id('picker-exp-employment-0')).tap();
    await element(by.text('Contract')).tap();
    // await element(by.id('candidate-profile-form-scroll')).scrollTo('bottom');
  });
});