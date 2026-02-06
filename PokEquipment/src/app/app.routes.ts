import { Routes } from '@angular/router';

import {HomeComponent} from './components/home/home';
import {InfiniteList} from './components/infinite-list/infinite-list';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'infiniteList', component: InfiniteList }
];
