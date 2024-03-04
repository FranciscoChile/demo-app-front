import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './features/news/news.component';
import { FavsComponent } from './features/favs/favs.component';

export const routes: Routes = [
  {path: 'news-list', component: NewsComponent},
  {path: 'favs-list', component: FavsComponent},
  {path: '', redirectTo: '/news-list', pathMatch: 'full'}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
