import React, { useState } from "react";

const provider = window.ethereum;

export default function EthDApp() {
  const [currentInfo, setCurrentInfo] = useState({});
  const connect = async () => {
    const res = await provider.request({ method: 'eth_requestAccounts' });
    console.log('res', res);
  }
  const signMessage_verifyMessage = async () => {
    // const message = "abcdefghijk123456789";
    // const res = await provider.request({
    //   method: 'ethSign',
    //   // __type: 'ethSign',
    //   params: ['0xa90FF932b72727Bf9F2fF42B2bA7034853888714', "0xdeadbeaf"],
    // })
    const signedData = {
      tx: {
        accountId: 52902,
        amount: "100000000000000",
        fee: "500000000000000",
        from: "0x595b133E448C0bCFf778Fd1cC1e43C1ea2F9f0Ba",
        l1TargetToken: 36,
        l2SourceToken: 36,
        nonce: 1,
        signature: {
          pubKey: '65a048d4fd1f5bd1fb29eea662d4a10373b13d488f4a9ee11bce2b19b6102492',
          signature: '5d25c274ebcdc19ce2a6e98cd01299fb0aeef1f44316b09884…69e9ccdcf89b4281f3a65ab7393050c35e74736d42706be01',
        },
        subAccountId: 0,
        to: "0x595b133E448C0bCFf778Fd1cC1e43C1ea2F9f0Ba",
        toChainId: 6,
        ts: 1710335278,
        type: "Withdraw",
        withdrawFeeRatio: 0,
        withdrawToL1: 0
      },
      sig: {
        signature: "0x5dcb7d2658b595d5875c8c36d6da0a0dbe34e47c988ae62f722fbf2fd02c570e3e4bf96cc6e74ac0f60cd3073eaa7c1f03ed08b227f4cabd0575742cbd665c801b",
        type: "EthereumSignature"
      }
    }
    // const signature = await provider.signMessage(message);
    // const pubkey = await getPublicKey();
    // const res = verifyMessage(pubkey, message, signature);
    // return {
    //   message,
    //   signature,
    //   pubkey,
    //   verifyMessageResult: res,
    // };
  };
  return (
    <>
      <h2>EVM DApp Demo</h2>
      <div style={{ display: "grid", gap: 20 }}>
        {[
          connect,
          signMessage_verifyMessage,
        ].map((func, index) => (
          <div key={index}>
            <button
              onClick={async () => {
                try {
                  setCurrentInfo({
                    "function name": func.name,
                    "function returns": await func(),
                  });
                } catch (e) {
                  console.error(e);
                }
              }}
            >
              {func.name}
            </button>
          </div>
        ))}
      </div>
      {Object.keys(currentInfo).map((k) => (
        <div key={k} style={{ wordWrap: "break-word" }}>
          {k}: {JSON.stringify(currentInfo[k])}
        </div>
      ))}
    </>
  );
}
