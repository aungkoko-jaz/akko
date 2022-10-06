import { AdminlevelModule } from './adminlevel.module';

describe('AdminlevelModule', () => {
  let adminlevelModule: AdminlevelModule;

  beforeEach(() => {
    adminlevelModule = new AdminlevelModule();
  });

  
  it('should create an instance', () => {
    expect(adminlevelModule).toBeTruthy();
  });
});
