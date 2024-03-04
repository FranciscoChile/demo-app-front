import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/services/news';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.component.html',
  styleUrls: ['./favs.component.css']
})
export class FavsComponent implements OnInit {

  constructor(private api: NewsService) { }
  newsList: News[]  = [];
  newsListFiltered!: News;

  searchText = "";
  flagSort = true;


  ngOnInit(): void {    
    this.getFavorites();
  }

  getFavorites() {

    this.api.getFavorites().subscribe({
      next: (data) => {        
        const result = data.data;

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
  
  sortList() {
    if (this.flagSort)
      this.newsList.sort((a,b) => (a.published_at > b.published_at) ? 1 : ((b.published_at > a.published_at) ? -1 : 0))
    else 
      this.newsList.sort((a,b) => (a.published_at < b.published_at) ? 1 : ((b.published_at < a.published_at) ? -1 : 0))
    
      this.flagSort = !this.flagSort;
  }

  setFav(id: number) {
    this.api.delete(id).subscribe({
      next: (data) => {
        this.getFavorites();
      },      
      error: (e) => {
        console.log('Error');
      }
    });
  }

}
