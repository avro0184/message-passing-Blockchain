import { useEffect, useState } from "react";
import contraabi from "../../artifacts/contracts/Message.sol/MessagePassing.json";
import { ethers } from "ethers";

console.log(process.env.CNNTRACT_ADDRESS)

function App() {
  const [message, Setmessage] = useState("");
  const [list, setList] = useState([]);
  const [account, setAccount] = useState("");
  const [state, setstate] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  useEffect(() => {
    const setblock = async () => {
      const ContractAddress = "0xac52F826Cf60a2c5B9Fb8ABFaf4eE171d917c97c";
      const ContractAbi = contraabi.abi;
      const { ethereum } = window;
      const account = await ethereum.request({ method: "eth_requestAccounts" });
      setAccount(account);
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ContractAddress,
        ContractAbi,
        signer
      );
      setstate({ provider, signer, contract });
    };
    setblock();
  }, []);

  const updateMessage = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const updatemsg = await contract.SetMessage(message);
    await updatemsg.wait;
    const updatedList = [...list, { account, message }];
    setList(updatedList);
    console.log(updatedList);
  };

  return (
    <>
      <div className="bg-light p-5 m-0 ">
        <form action="" onSubmit={updateMessage}>
          <div className="mb-3 ">
            <label for="exampleFormControlTextarea1" className="form-label">
              Write your text here .....
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              value={message}
              onChange={(e) => Setmessage(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button type="submit" className="btn btn-secondary">
              Secondary
            </button>
          </div>
        </form>
      </div>

      <div className="m-4">
        <h2>List Data:</h2>
        {list.map((item) => (
          <div key={item.account}>
          <p>Account: {item.account}</p>
          <p>Update Message Function: {item.message}</p>
          <hr />
        </div>
        ))}
      </div>
    </>
  );
}

export default App;
