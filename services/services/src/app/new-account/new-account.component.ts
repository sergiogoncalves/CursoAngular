import { AccountService } from './../service/account.service';
import { LoggingService } from '../service/logging.service';
import { Component} from '@angular/core';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
 // providers: [LoggingService]
})
export class NewAccountComponent {


  constructor(private logginService: LoggingService, private accountService: AccountService) {
    this.accountService.statusUpdated.subscribe(
        (status: string) => alert('New Status' + status)

    );
  }

  onCreateAccount(accountName: string, accountStatus: string) {

    this.accountService.addAcount(accountName, accountStatus);


  }
}
