import QRCode from "react-qr-code";
import { Nav, NavItem, NavLink } from "reactstrap";

export default function QrTile({ data }: { data: string }) {
  return (
    <div>
      <QRCode value={data} level='Q' />
      <Nav>
        <NavItem>
          <NavLink href={data}>{data}</NavLink>
        </NavItem>
      </Nav>
    </div>);
}