import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service';
import { Transaction } from 'savjeecoin';
import { TransactionsTableComponent } from 'src/app/components/transactions-table/transactions-table.component';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit {

  public newTx; //irá guardar a fromAddress, toAddress, amount
  public walletKey;

  constructor(private blockchainService: BlockchainService) { 
    this.walletKey = blockchainService.walletKeys[0];
  }

  ngOnInit() {
    this.newTx = new Transaction();
  }

  createTransaction() {
    this.newTx.fromAddress = this.walletKey.publicKey;
    this.newTx.signTransaction(this.walletKey.keyObj); //ver blockchain.service.ts
    
    this.blockchainService.addTransaction(this.newTx); //vamos adicionar a transação às pending transactions

    this.newTx = new Transaction(); // vamos fazer reset ao newtX, limpar esta variável
  }
}
