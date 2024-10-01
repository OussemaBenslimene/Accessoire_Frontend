import { TestBed } from '@angular/core/testing';
import { AccessoireGuard } from './accessoire.guard';

describe('ProduitGuard', () => {
  let guard: AccessoireGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccessoireGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
