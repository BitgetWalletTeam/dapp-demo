import React, { useEffect, useState } from "react";
import { getAptosWallets } from "@aptos-labs/wallet-standard";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const provider = window.bitkeep?.aptos || window.aptos;

export default function Aptos62DApp() {
  const {
    connect,
    account,
    network,
    connected,
    disconnect,
    wallet,
    wallets,
    signAndSubmitTransaction,
    signAndSubmitBCSTransaction,
    signTransaction,
    signMessage,
    signMessageAndVerify,
  } = useWallet();
  const [currentInfo, setCurrentInfo] = useState({});
  const [params, setParams] = useState("");
  // useEffect(() => {
  //     const removeRegisterListener = on("register", function () {
  //       // The dapp can add new aptos wallets to its own state context as they are registered
  //       let { aptosWallets } = getAptosWallets();
  //       console.log('aptosWallets', aptosWallets);
  //     });
  //     return () => {
  //       const removeUnregisterListener = on("unregister", function () {
  //         let { aptosWallets } = getAptosWallets();
  //       });
  //     }
  // }, []);
  const getWallets = () => wallets;

  const signMsg = async (
    args = ["The message to be signed and displayed to the user", "1"],
  ) => {
    if (!connected) return;
    return await signMessage({
      message: args[0],
      nonce: args[1],
    });
  };
  const signTx = async () => {
    // if (!connected) return;
    const transaction = {
      // rawTransaction: 1,
      arguments: ["100000", "330679"],
      function:
        "0xc7efb4076dbe143cbcd98cfaaa929ecfc8f299203dfff63b95ccb6bfe19850fa::router::swap_exact_input",
      type: "entry_function_payload",
      type_arguments: [
        "0x1::aptos_coin::AptosCoin",
        "0x159df6b7689437016108a019fd5bef736bac692b6d4a1f10c941f6fbb9a74ca6::oft::CakeOFT",
      ],
    };
    return await signTransaction(transaction);
  };
  const providerSignTx = async () => {
    await provider.connect();
    await provider.account();
    const transaction = {
      arguments: ["100000", "330679"],
      function:
        "0xc7efb4076dbe143cbcd98cfaaa929ecfc8f299203dfff63b95ccb6bfe19850fa::router::swap_exact_input",
      type: "entry_function_payload",
      type_arguments: [
        "0x1::aptos_coin::AptosCoin",
        "0x159df6b7689437016108a019fd5bef736bac692b6d4a1f10c941f6fbb9a74ca6::oft::CakeOFT",
      ],
    };
    return await provider.signTransaction(transaction);
  };
  const signAndSubmitTx = async () => {
    if (!connected) return;
    const transaction = {
      functionArguments: ["100000", "330679"],
      function:
        "0xc7efb4076dbe143cbcd98cfaaa929ecfc8f299203dfff63b95ccb6bfe19850fa::router::swap_exact_input",
      type: "entry_function_payload",
      typeArguments: [
        "0x1::aptos_coin::AptosCoin",
        "0x159df6b7689437016108a019fd5bef736bac692b6d4a1f10c941f6fbb9a74ca6::oft::CakeOFT",
      ],
    };
    return await signAndSubmitTransaction({
      data: transaction,
      options: {},
    });
  };
  const providerSignAndSubmitTx = async () => {
    if (!connected) return;
    const transaction = {
      arguments: ["100000", "330679"],
      function:
        "0xc7efb4076dbe143cbcd98cfaaa929ecfc8f299203dfff63b95ccb6bfe19850fa::router::swap_exact_input",
      type: "entry_function_payload",
      type_arguments: [
        "0x1::aptos_coin::AptosCoin",
        "0x159df6b7689437016108a019fd5bef736bac692b6d4a1f10c941f6fbb9a74ca6::oft::CakeOFT",
      ],
    };
    return await provider.signAndSubmitTransaction(transaction);
  };

  return (
    <>
      {wallets.map((it, i) => (
        <button
          key={it.name}
          onClick={async () => await connect(it?.name)}
          className="walletContent"
        >
          <img src={it?.icon} alt="" className="connectIcon" />
          <div>{it?.name}</div>
          <b>{wallet?.name === it?.name && "Connected"}</b>
        </button>
      ))}
      {!!connected && (
        <div>
          address:{account?.address} <br />
          publicKey:{account?.publicKey}
        </div>
      )}
      <textarea
        type="text"
        value={params}
        onChange={(e) => setParams(e.target.value)}
        placeholder={`multi params divide by:','`}
      />
      <div style={{ display: "grid", gap: 20 }}>
        {[
          getWallets,
          disconnect,
          signMsg,
          signTx,
          providerSignTx,
          signAndSubmitTx,
          providerSignAndSubmitTx,
        ].map((func, index) => (
          <div key={index}>
            <button
              onClick={async () => {
                try {
                  setCurrentInfo({
                    "function name": func.name,
                    "function params": params.split(","),
                    "function returns": await func(
                      params ? params.split(",") : undefined,
                    ),
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
        {Object.keys(currentInfo).map((k) => (
          <div key={k} style={{ wordWrap: "break-word" }}>
            {k}: {JSON.stringify(currentInfo[k])}
          </div>
        ))}
      </div>
    </>
  );
}
