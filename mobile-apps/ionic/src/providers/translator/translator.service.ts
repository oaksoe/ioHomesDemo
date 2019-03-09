import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
 
@Injectable()
export class TranslatorService {
    constructor(
        public translateService: TranslateService,
    ) {
    }
 
    public instance(text: string): string {
        return this.translateService.instant(text);
    }
}
