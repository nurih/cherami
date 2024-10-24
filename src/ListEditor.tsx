import { Card, CardBody, CardHeader, Table } from "reactstrap";
import { QrData } from "./QrStorage";
import ConfirmedAction from "./ConfirmedAction";
import LocalFile from "./LocalFIle";
import ListItem from "./ListItem";



export default function ListEditor({ items, updateItems }: { items: QrData[], updateItems: (items: QrData[]) => void }) {
  function swapItems(index: number, neighbor: number): void {
    if (index < 0 || index >= items.length) {
      throw new Error(`${index} out of bounds for ${items.length}`);
    }
    const result = [...items];
    [result[index + neighbor], result[index]] = [result[index], result[index + neighbor]];
    console.log(`was ${items.map(e => e.name)} now ${result.map(e => e.name)}`)
    updateItems(result);
  }

  const deleteItem = (id: number) => {
    console.log(`Delete item ${id}`)
    updateItems(items.filter(item => item.id !== id));
  };

  return (
    <>
      <Card className="align-left-start">
        <CardHeader>
          <h4>Change QR Listing</h4>
        </CardHeader>
        <CardBody>
          <p>Change the order of the items, or delete them.</p>
          <Table size="sm">{
            items.map((q, i) => (
              <ListItem
                key={i}
                item={q}
                index={i}
                swapItems={swapItems}
                itemCount={items.length}
                deleteItem={(index) => deleteItem(index)}
              />
            ))}
          </Table>
        </CardBody>
      </Card>
      <LocalFile data={items} addItems={updateItems} />

      <Card>
        <p>Clicking this button will delete all QR items from your list <b>permanently</b>.</p>
        <div className="text-align-end">
          <ConfirmedAction
            buttonText='Delete all'
            buttonIcon='bi-trash3'
            buttonColor="danger"
            ok={() => updateItems([])}
            title='Are you sure?'
            message={`This will permanently delete all ${items.length} QR codes.`}
          />
        </div>
      </Card>

    </>
  )
}