// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideRouter } from "@angular/router";
import { ROUTES } from "./app/routes/routes";
import { importProvidersFrom } from "@angular/core";
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { environment } from "./environments/environment.development";
import { provideAuth, getAuth } from "@angular/fire/auth";


bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(ROUTES),
        importProvidersFrom(
          provideFirebaseApp(() => initializeApp(environment.firebase)),
          provideAuth(() => getAuth()),
        ),
    ]
});