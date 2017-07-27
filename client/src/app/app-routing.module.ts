import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { BlogListComponent } from './components/blog/blog-list.component';
import { EditBlogComponent } from './components/blog/edit-blog/edit-blog.component';
import { PublicProfileComponent } from './components/profile/public-profile/public-profile.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard] },
    { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'user/:username', component: PublicProfileComponent, canActivate: [AuthGuard] },
    { path: 'blog', component: BlogListComponent, canActivate: [AuthGuard] },
    { path: 'edit/:id', component: EditBlogComponent, canActivate: [AuthGuard] },
    { path: '**', component: HomeComponent }
]

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(appRoutes)],
    providers: [],
    bootstrap: [],
    exports: [RouterModule]
})
export class AppRoutingModule { }