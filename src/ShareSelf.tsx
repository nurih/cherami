import QRCode from "react-qr-code";
import { Button, PopoverHeader, PopoverBody, UncontrolledPopover } from "reactstrap";

export default function ShareSelf() {
  const url = window?.location?.href;
  return (

    <div className="text-middle" color="" style={{marginTop: '1rem'}}>
      <Button id="QrPopover" type="button" className="float-end" outline>
        Get this app <i className="bi bi-box-arrow-in-up-right">


        </i >
      </Button>

      <UncontrolledPopover target="QrPopover" trigger="focus" >
        <PopoverHeader>
          Get This App!
        </PopoverHeader>
        <PopoverBody>
          <QRCode value={url} level='Q' />
        </PopoverBody>
      </UncontrolledPopover>
    </div>
  )
}