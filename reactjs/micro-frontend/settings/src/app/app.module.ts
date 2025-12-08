import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SettingsModule } from './settings/settings.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        SettingsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
