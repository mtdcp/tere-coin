import { Injectable } from '@angular/core';
import  EC  from 'elliptic'; 
import { Blockchain } from 'savjeecoin';
import { ɵKeyEventsPlugin } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  public blockchainInstance = new Blockchain();
  public walletKeys = []; // o [] permite  transactions

  constructor() {
    this.blockchainInstance.difficulty = 1; // faz o processo de mineração mais rápido
    this.blockchainInstance.minePendingTransactions('my-wallet-address');

    this.generateWalletKeys();
   }

   getBlocks() { //store all the blocks
     return this.blockchainInstance.chain;
   }

   addTransaction(tx) {
     this.blockchainInstance.addTransaction(tx);
   }

   getPendingTransactions() {
     return this.blockchainInstance.pendingTransactions;
   }

   minePendingTransactions() {
     this.blockchainInstance.minePendingTransactions(
       this.walletKeys[0].publicKey
     )
   }

   private generateWalletKeys() {
     const ec = new EC.ec('secp256k1');
     const key = ec.genKeyPair();

     this.walletKeys.push( {
       keyObj: key,
       publicKey: key.getPublic('hex'),
       privateKey: key.getPrivate('hex')
     });
   }
}
