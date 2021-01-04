import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LoginComponent } from './components/login/login.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UserService } from './service/user.service';
import { forgotPassword } from './components/forgot-password/forgot-password.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { CreateNotesComponent } from './components/create-notes/create-notes.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { GetNoteComponent } from './components/get-note/get-note.component';
import { CardPannelComponent } from './components/card-pannel/card-pannel.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogNoteComponent } from './components/dialog-note/dialog-note.component';
import { TrashComponent } from './components/trash/trash.component';
import { ArchiveComponent } from './components/archive/archive.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ColorPalletComponent } from './components/color-pallet/color-pallet.component';
import {MatChipsModule} from '@angular/material/chips';
import { AuthInterceptor } from './service/auth/auth.interceptor';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';
import { AuthGuardService } from './service/auth/auth-guard.service';
import { ReminderNoteComponent } from './components/reminder-note/reminder-note.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    ResetPasswordComponent,
    forgotPassword,
    DashboardComponent,
    CreateNotesComponent,
    GetNoteComponent,
    CardPannelComponent,
    DialogNoteComponent,
    TrashComponent,
    ArchiveComponent,
    ColorPalletComponent,
    ReminderNoteComponent
  ],
  entryComponents:[GetNoteComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonToggleModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatExpansionModule,
    TextFieldModule,
    MatMenuModule,
    MatDatepickerModule,
    MatDialogModule,
    MatTooltipModule,
    MatChipsModule,
    MatCheckboxModule,
    MatGridListModule
  ],
  providers: [UserService,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
