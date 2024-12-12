import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';


import { environment } from '../environments/environment';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BienvenidaPageModule } from './bienvenida/bienvenida.module'; // Asegúrate de que la ruta es correcta
import { ConfirmacionModalModule } from './recuperar/confirmacion-modal.module'; // Importar el módulo del modal
import { SQLite } from '@ionic-native/sqlite/ngx';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BienvenidaPageModule, // Asegúrate de que esté bien importado
    ConfirmacionModalModule, // Asegúrate de que el módulo del modal esté importado
    HttpClientModule // Agregado para habilitar HttpClient
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLite // Proveedor de SQLite
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
