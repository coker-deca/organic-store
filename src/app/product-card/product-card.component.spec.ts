import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingCartService } from '../services/shopping-cart.service';

import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  
  beforeEach(async () => {
    // const spy = jasmine.createSpyObj('ShoppingCartService', ['getCart']);
    
    class MockCartService {
      isLoggedIn = true;
      user = { name: 'Test User'};
    }
    
    await TestBed.configureTestingModule({
      declarations: [ ProductCardComponent ],
      providers: [ ProductCardComponent, 
        { provide: ShoppingCartService, useClass: MockCartService } ]
    })
    .compileComponents();

    
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    const cartService = TestBed.inject(ShoppingCartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
