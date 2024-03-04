import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/services/news';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private api: NewsService) { }
  newsList: News[]  = [];
  newsListFiltered!: News;

  nextUrl = "https://api.spaceflightnewsapi.net/v4/articles/";
  previousUrl = "";
  searchText = "";
  flagSort = true;

  ngOnInit(): void {    
    this.getList(this.nextUrl);
  }

  getList(url: string) {

    this.api.getNews(url).subscribe({
      next: (data) => {        
        this.nextUrl = data.next;
        this.previousUrl = data.previous;
        const result = data.results;

        this.newsList = result.map((elem: any) => {
          var c = new News();

          c.id = elem.id;
          c.title = elem.title;
          c.description = elem.news_site;
          c.summary = elem.summary;
          c.image_url = elem.image_url;
          c.published_at = elem.published_at;

          return c;
        });
      },
      error: (e) => {
        console.log('Error');        
      }
    })

  }
  
  nextPage() {
    if (this.nextUrl)
      this.getList(this.nextUrl);
  }


  previousPage() {
    if (this.previousUrl)
      this.getList(this.previousUrl);
  }


  sortList() {
    if (this.flagSort)
      this.newsList.sort((a,b) => (a.published_at > b.published_at) ? 1 : ((b.published_at > a.published_at) ? -1 : 0))
    else 
      this.newsList.sort((a,b) => (a.published_at < b.published_at) ? 1 : ((b.published_at < a.published_at) ? -1 : 0))
    
      this.flagSort = !this.flagSort;
  }

  setFav(id: number) {
    this.newsListFiltered = this.newsList.filter(c => c.id === id )[0];
    this.api.saveFavorite(this.newsListFiltered).subscribe({      
      error: (e) => {
        console.log('Error');
      }
    });
  }

  searchNews(event: Event) {

    const newValue = (event.target as HTMLInputElement).value;

    this.api.searchNews(newValue).subscribe({
      next: (data) => {        
        this.nextUrl = data.next;
        this.previousUrl = data.previous;
        const result = data.results;

        this.newsList = result.map((elem: any) => {
          var c = new News();

          c.id = elem.id;
          c.title = elem.title;
          c.description = elem.news_site;
          c.summary = elem.summary;
          c.image_url = elem.image_url;
          c.published_at = elem.published_at;

          return c;
        });
      },
      error: (e) => {
        console.log('Error');        
      }
    })

  }
}
