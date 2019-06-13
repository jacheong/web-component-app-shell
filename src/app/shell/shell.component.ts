import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Input, Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
	selector: 'app-shell',
	templateUrl: './shell.component.html',
	styleUrls: [ './shell.component.scss' ],
	encapsulation: ViewEncapsulation.ShadowDom
})
export class ShellComponent implements OnInit, OnDestroy {
	@Input() topbartitle: string;
	topGap = 56;
	isMobileLayout: boolean;
	bpoSub: Subscription[] = [];

	constructor(
		private iconRegistry: MatIconRegistry,
		private sanitizer: DomSanitizer,
		private breakPointObserver: BreakpointObserver
	) {}

	ngOnInit() {
		this.iconRegistry.addSvgIcon('menu', this.sanitizer.bypassSecurityTrustResourceUrl('assets/menu-24px.svg'));

		this.bpoSub.push(
			this.breakPointObserver.observe([ Breakpoints.Handset ]).subscribe((layout) => {
				if (layout.matches) {
					this.isMobileLayout = true;
				} else {
					this.isMobileLayout = false;
				}
			})
		);
	}

	ngOnDestroy() {
		this.bpoSub.forEach((sub) => {
			if (sub) {
				sub.unsubscribe();
			}
		});
	}
}
