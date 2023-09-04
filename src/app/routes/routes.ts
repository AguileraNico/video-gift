import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        redirectTo: '/public',
        pathMatch: 'full'
    },
	{
		path: 'public',
		loadComponent: async () =>
			(await import('../pages/public/public.component')).PublicComponent,
	},
	{
		path: 'private',
		loadComponent: async () =>
			(await import('../pages/private/private.component')).PrivateComponent,
	},
];
