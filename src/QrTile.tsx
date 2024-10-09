import QRCode from "react-qr-code";
import { Button, Nav, NavItem, NavLink } from "reactstrap";


export default function QrTile({ data, editMode }: { data: string, editMode: boolean }) {
  return (
    <div>      
      <QRCode value={data} level='L'/>
      <Nav>
        <NavItem>
          <NavLink href={data}>{data}</NavLink>
        </NavItem>
      </Nav>
    </div>);
}