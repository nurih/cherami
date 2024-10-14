import { Button, Card, Table } from "reactstrap";
import { QrData } from "./QrStorage";
import ConfirmedAction from "./ConfirmedAction";

function ListItem({ item, index, itemCount, swapItems, deleteItem }: {
  item: QrData,
  index: number,
  itemCount: number,
  swapItems: (index: number, neighbor: number) => void,
  deleteItem: (index: number) => void
}) {


  return (
    <tbody>
      <tr>
        <td>
          <h4>
            <Button onClick={() => swapItems(index, -1)} disabled={index == 0} color="primary"><i className="bi bi-arrow-up"></i></Button>
            <Button onClick={() => swapItems(index, 1)} disabled={index == itemCount - 1} color="info"><i className="bi bi-arrow-down"></i></Button>

            &nbsp;{item.name}
          </h4>
        </td>
        <td>
          <ConfirmedAction
            buttonText=''
            buttonIcon='bi-trash3'
            buttonColor="danger"
            title='Are you sure?'
            message={`This will permanently delete ${item.name} \n for the url ${item.text} .`}
            ok={() => deleteItem(item.id)}
          />
        </td>
      </tr>
    </tbody>
  )
}

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
    <Card className="align-left-start">
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
  )
}