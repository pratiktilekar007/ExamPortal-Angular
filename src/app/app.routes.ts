import { Routes } from '@angular/router';
import { authGaurdGuard } from './gaurd/auth-gaurd-guard';
import { publicGuard } from './gaurd/public-guard';

export const routes: Routes = [

    {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),canActivate: [publicGuard]
    },
    {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login),canActivate: [publicGuard]
    },
    {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then(m => m.Register),canActivate: [publicGuard]
    },
    {
    path: 'admin',
    loadComponent: () => import('./pages/admin/dashboard/dashboard').then(m => m.Dashboard),canActivate: [authGaurdGuard],
        children:[
            {path:'', loadComponent: () =>import('./pages/admin/admin-welcome/admin-welcome').then(m => m.AdminWelcome),canActivate: [authGaurdGuard]},
            {path:'profile', loadComponent: () =>import('./pages/admin/profile/profile').then(m => m.Profile),canActivate: [authGaurdGuard]},
            {path:'viewcategories', loadComponent: () =>import('./pages/admin/view-categories/view-categories').then(m => m.ViewCategories),canActivate: [authGaurdGuard]},
            {path:'addcategories', loadComponent: () =>import('./pages/admin/add-categories/add-categories').then(m => m.AddCategories),canActivate: [authGaurdGuard]},
            {path:'viewquizzes', loadComponent: () =>import('./pages/admin/view-quizzes/view-quizzes').then(m => m.ViewQuizzes),canActivate: [authGaurdGuard]},
            {path:'addquizzes', loadComponent: () =>import('./pages/admin/add-quize/add-quize').then(m => m.AddQuize),canActivate: [authGaurdGuard]},
            {path:'updatequizzes/:qid', loadComponent: () =>import('./pages/admin/update-quize/update-quize').then(m => m.UpdateQuize),canActivate: [authGaurdGuard]},
            {path:'viewquestions/:id/:title', loadComponent: () =>import('./pages/admin/view-questions/view-questions').then(m => m.ViewQuestions),canActivate: [authGaurdGuard]},
            {path:'addquestions/:id/:title', loadComponent: () =>import('./pages/admin/add-questions/add-questions').then(m => m.AddQuestions),canActivate: [authGaurdGuard]}

        ]
    },
    {
    path: 'user',
    loadComponent: () => import('./pages/user/dashboard/dashboard').then(m => m.Dashboard),canActivate: [authGaurdGuard],
        children:[
            {path:'', loadComponent: () =>import('./pages/user/user-welcome/user-welcome').then(m => m.UserWelcome),canActivate: [authGaurdGuard]},
            {path:'loadquiz/:catId', loadComponent: () =>import('./pages/user/load-quiz/load-quiz').then(m => m.LoadQuiz),canActivate: [authGaurdGuard]},
            {path:'instruction/:qId', loadComponent: () =>import('./pages/user/instruction/instruction').then(m => m.Instruction),canActivate: [authGaurdGuard]}
        ]
    },
    {path:'start/:qId', loadComponent: () =>import('./pages/user/start/start').then(m => m.Start),canActivate: [authGaurdGuard]}


];
