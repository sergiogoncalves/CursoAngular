import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { ServersComponent } from './servers/servers.component';
import { ServerComponent } from './servers/server/server.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './auth-guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from './servers/server/server-resolver.service';

const appRoutes: Routes = [

  {path: '', component: HomeComponent },
  {path: 'users', component: UsersComponent, children:[
    {path: ':id/:name', component: UserComponent },
  ] },

  {
    path: 'servers',
    // canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    component: ServersComponent,
    children: [
    {path: ':id', component: ServerComponent, resolve: {server: ServerResolver} },
    {path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard]}

  ] },
  // {path: 'not-found', component: PageNotFoundComponent},
  {path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'}},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
imports: [
  // RouterModule.forRoot(appRoutes, {useHash: true}) //Usar esse hash pra prevenir problema de o servidor encontrar a URL pois o angular tem apenas 1 arquivo
  RouterModule.forRoot(appRoutes)
],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
