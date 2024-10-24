import { Button } from "reactstrap"
import ConfirmedAction from "./ConfirmedAction"
import { QrData } from "./QrStorage"

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
          <Button onClick={() => swapItems(index, -1)} disabled={index == 0} color="light"><i className={index == 0 ? "bi bi-dash-square-dotted" : "bi bi-chevron-up"}></i></Button>
          <Button onClick={() => swapItems(index, 1)} disabled={index == itemCount - 1} color="light"><i className={index == itemCount - 1 ? "bi bi-dash-square-dotted" : "bi bi-chevron-down"}></i></Button>
        </td>
        <td>
          <h4>
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

export default ListItem;