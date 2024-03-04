import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FavsComponent } from './favs.component';
import { NewsService } from 'src/app/services/news.service';

describe('FavsComponent', () => {
  let component: FavsComponent;
  let fixture: ComponentFixture<FavsComponent>;
  let service: NewsService;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ FavsComponent ],
      providers: [service]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
