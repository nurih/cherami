import QRCode from "react-qr-code";
import { Button, PopoverHeader, PopoverBody, UncontrolledPopover } from "reactstrap";

export default function ShareSelf() {
  const url = window?.location?.href;
  return (

    <div style={{ marginTop: '1rem' }} className="float-end">
      <Button id="QrPopover" type="button" outline>
        <i className="bi bi-box-arrow-in-up-right"> </i >
      </Button>
      <br/>
      <p style={{ fontSize: '.45rem'}}>Share the joy</p>
      
      <UncontrolledPopover placement="left" target="QrPopover" trigger="focus">
        <PopoverHeader>
          Try Cher Ami for yourself!
        </PopoverHeader>
        <PopoverBody >
          <QRCode value={url} level='Q' size={120} />
        </PopoverBody>
      </UncontrolledPopover>
    </div>
  )
}