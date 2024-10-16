import { useState } from "react";
import { Button, Toast } from "reactstrap";
import Haptic from "./Haptic";




function NfcWriter({ url }: { url: string }) {
  const [messages, setMessages] = useState<string[]>([]);
  let nfc: any;

  if ('NDEFReader' in window) {
    nfc = new (window as any).NDEFReader();
  } else {
    nfc = null;
  }


  const send = async () => {
    try {
      const record = { recordType: 'url', data: url, };

      setMessages([...messages, 'Starting scan']);

      await nfc.scan();

      setMessages([...messages, 'Scanning...']);

      nfc.onreading = async function* r() {
        setMessages([...messages, 'Found!', `Sending ${url}`]);
        new Haptic().vibrate();
        await this.nfc.write(record);
        setMessages([...messages, `Sent ${url}.`]);
      };

    } catch (error) {
      console.error('Error writing NFC message:', error);
    }
  }


  return (
    <>
      <Button color="info" onClick={send} disabled={nfc == null}><i className="bi bi-wifi "></i></Button>
      <div className="toast-container">
        {
          messages.map((m, i) => (
            <Toast key={i} toggle={function noRefCheck() { }}>{m}</Toast>
          ))
        }
      </div>
    </>

  )
}

export default NfcWriter;