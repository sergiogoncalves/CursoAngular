import { LoggingService } from '../service/logging.service';
import { Component, Input} from '@angular/core';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
 // providers: [LoggingService]
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  constructor(private logginService: LoggingService, private accountService: AccountService) {}

  onSetTo(status: string) {

    this.accountService.updateStatus(this.id, status);

    this.accountService.statusUpdated.emit(status);
  }
}
