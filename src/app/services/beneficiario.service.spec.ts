import { TestBed } from '@angular/core/testing';

import { BeneficiarioService } from './beneficiario.service';

describe('BeneficiarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeneficiarioService = TestBed.get(BeneficiarioService);
    expect(service).toBeTruthy();
  });
});
