import QRCode from "react-qr-code";
import { Nav, NavItem, NavLink } from "reactstrap";
import NfcSender from "./NfcSender";


export default function QrTile({ data }: { data: string }) {
  return (
    <div>
      <QRCode value={data} level='L' />
      <Nav>
        <NavItem>
          <NavLink href={data}>{data}</NavLink>
        </NavItem>
      </Nav>
      <div className="align-self-end">

        <NfcSender url={data} />
      </div>
    </div>);
}