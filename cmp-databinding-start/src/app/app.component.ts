import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  oddNumbers: number[] = [];
  evenNumbers: number[] = [];


  serverElements = [{type: 'server', name: 'Testserver', content: 'Just a test!'}];

  onServerAdded(serverData: {serverName: string, serverContent: string}) {
        this.serverElements.push({
          type: 'server',
          name: serverData.serverName,
          content: serverData.serverContent
        });
      }

      onBluePrintedAdded(blueprintData: {serverName: string, serverContent: string}) {
        this.serverElements.push({
          type: 'blueprint',
          name: blueprintData.serverName,
          content: blueprintData.serverName
        });
      }

  onChangeFirst() {
    this.serverElements[0].name = 'Changed!';
  }

  onDestroyFirst() {
    this.serverElements.splice(0, 1);
  }

  onIntervalFired(firedNumber: number) {
    if (firedNumber % 2 === 0) {
      console.log('Even');
      this.evenNumbers.push(firedNumber);
    } else {
      console.log('Odd');
      this.oddNumbers.push(firedNumber);
    }
  }

}
