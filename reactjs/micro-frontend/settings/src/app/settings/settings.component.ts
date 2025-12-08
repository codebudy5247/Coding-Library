import { Component } from '@angular/core';

interface AppSettings {
    language: string;
    timezone: string;
    emailNotifications: boolean;
    pushNotifications: boolean;
    darkMode: boolean;
    autoSave: boolean;
}

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
    settings: AppSettings = {
        language: 'en',
        timezone: 'UTC',
        emailNotifications: true,
        pushNotifications: false,
        darkMode: false,
        autoSave: true
    };

    languages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'fr', name: 'Français' },
        { code: 'de', name: 'Deutsch' }
    ];

    timezones = [
        'UTC',
        'America/New_York',
        'Europe/London',
        'Asia/Tokyo',
        'Australia/Sydney'
    ];

    saveSettings() {
        console.log('Settings saved:', this.settings);
        alert('Settings saved successfully!');
    }

    resetSettings() {
        this.settings = {
            language: 'en',
            timezone: 'UTC',
            emailNotifications: true,
            pushNotifications: false,
            darkMode: false,
            autoSave: true
        };
    }
}
