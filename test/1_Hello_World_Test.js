const HelloWorld = artifacts.require("./HelloWorld.sol");

contract(
  "Hello World",
  ([
    deployer,
    betterOne,
    betterTwo,
    staker,
    ErrorBetterOne,
    ErrorBetterTwo,
  ]) => {
    let hello;

    before(async () => {
      hello = await HelloWorld.deployed();

      const Contract_Address = await hello.address;
      console.log(Contract_Address);
    });

    describe("Just Fucking Testing", async () => {
      it("Returns A Word", async () => {
        let word = await hello.read_word();
        console.log(word);
      });

      it("Sets A Word", async () => {
        await hello.Change_Word("42");

        let new_word = await hello.read_word();
        console.log(new_word);
      });
    });
  }
);
