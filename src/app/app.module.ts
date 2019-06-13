import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';

import { MaterialModule } from './vendors/material.module';
import { ShellComponent } from './shell/shell.component';

@NgModule({
	declarations: [ ShellComponent ],
	imports: [ BrowserModule, BrowserAnimationsModule, MaterialModule, HttpClientModule ],
	providers: [],
	entryComponents: [ ShellComponent ],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {
	constructor(private injector: Injector) {}

	ngDoBootstrap() {
		const elements: any[] = [ [ ShellComponent, 'app-shell' ] ];

		for (const [ component, name ] of elements) {
			const el = createCustomElement(component, { injector: this.injector });
			customElements.define(name, el);
		}
	}
}
