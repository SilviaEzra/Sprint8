import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { CalendarComponent } from './calendar/calendar.component';
import { UbicacionComponent } from './ubicacion/ubicacion.component';
import { AddeditComponent } from './addedit/addedit.component';
import { NotasComponent } from './nota/nota.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },  // Ruta por defecto
    { path: 'add', component: AddeditComponent },
    { path: 'edit/:id', component: AddeditComponent },
    { path: 'home', component: HomeComponent },
    { path: 'lista', component: ListComponent },
    { path: 'calendario', component: CalendarComponent },
    { path: 'ubicacion', component: UbicacionComponent },
    { path: 'notas', component: NotasComponent },
];
