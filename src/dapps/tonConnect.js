import { TonConnectUI } from "@tonconnect/ui";
import React, { useState } from "react";

const tonConnectUI = new TonConnectUI({
  manifestUrl: "https://myapp/tonconnect-manifest.json",
  //   buttonRootId: "",
});

export default function TonConnectDApp() {
  const [currentInfo, setCurrentInfo] = useState({});
  const openModal = async () => await tonConnectUI.openModal();
  const getWallets = async () => await tonConnectUI.getWallets();
  const onStatusChange = async () => {
    const unsubscribe = tonConnectUI.onStatusChange((walletInfo) => {
      // update state/reactive variables to show updates in the ui
      console.log("walletInfo", walletInfo);
    });
    return unsubscribe;
  }
  return (
    <>
      <h2>Ton Connect DApp Demo</h2>
      <div style={{ display: "grid", gap: 20 }}>
        {[openModal, getWallets, onStatusChange].map((func, index) => (
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
