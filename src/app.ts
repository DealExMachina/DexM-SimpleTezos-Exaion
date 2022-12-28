import { TezosToolkit } from "@taquito/taquito";
import $ from "jquery";

export class App {
  private tk: TezosToolkit;

  constructor() {
    this.tk = new TezosToolkit("https://node.exaion.com/api/v1/94c40cc0-06f0-4e17-93fd-367c53009bd2/rpc/");
  }

  public initUI() {
    $("#show-balance-button").bind("click", () =>
      this.getBalance($("#address-input").val())
    );
  }

  private showError(message: string) {
    $("#balance-output").removeClass().addClass("hide");
    $("#error-message")
      .removeClass()
      .addClass("show")
      .html("Error: " + message);
  }

  private showBalance(balance: number) {
    $("#error-message").removeClass().addClass("hide");
    $("#balance-output").removeClass().addClass("show");
    $("#balance").html(balance);
  }

  private getBalance(address: string) {
    this.tk.rpc
      .getBalance(address)
      .then(balance => this.showBalance(balance.toNumber() / 1000000))
      .catch(e => this.showError("Address not found"));
  }
}
