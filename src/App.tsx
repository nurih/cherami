import { useEffect, useState } from 'react'
import PWABadge from './PWABadge.tsx'
import './App.css'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Button, Card, CardBody, Form, FormGroup, Input, Label, Spinner, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { QrStorage, QrData } from './QrStorage';

import QrTile from './QrTile.tsx';

import ConfirmedAction from './ConfirmedAction.tsx';

const urlRe = /https?:\/\/\w{1,}\.\w{2,}/;


function App() {
  const [txt, setTxt] = useState<string>('https://');
  const [name, setName] = useState<string>('');
  const [items, setItems] = useState<QrData[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [editMode, setEditMode] = useState(false);

  const store = new QrStorage();

  useEffect(() => {
    setIsLoading(true);
    setError(null)
    try {
      const data = store.load();
      console.log(`Loaded ${(data || []).length} items.`)
      if (data) {
        setItems(data);
      }
    } catch (e) {
      setError(e as Error);
    }
    finally {
      setIsLoading(false)
    }
  }, []);


  function addItem() {
    const list = [{ id: Date.now(), text: txt, name: (name || txt) } as QrData, ...items];
    setItems(list)
    setTxt('https://');
    setOpen('0');
    store.save(list);
  }

  const deleteItem = (id: number) => {
    console.log(`Delete item ${id}`)
    setItems(items.filter(item => item.id !== id));
  };

  const [open, setOpen] = useState<string>('');
  const toggle = (id: string) => {
    if (open === id) {
      setOpen('');
    } else {
      setOpen(id);
    }
  };

  function deleteAll() {
    store.clear();
    setItems([]);

  }

  return (
    <>
      <h1><img src='shareme.svg' style={{ height: '2rem' }}></img>
        Cher Ami</h1>
      <i>Pronounced like "Jeramy" and also like dear friend in French</i>
      {isLoading && <Spinner color="danger" type="grow">Loading...</Spinner>}
      {error && <div className="p-3 bg-danger my-2 rounded">
        <Toast><ToastHeader>Error</ToastHeader><ToastBody>{JSON.stringify(error)}</ToastBody></Toast>
      </div>}

      <Accordion open={open} toggle={toggle}>
        {
          items.map((q, i) => (
            <AccordionItem key={i}>
              <AccordionHeader targetId={String(i)}>
                {q.name}
              </AccordionHeader>
              <AccordionBody accordionId={String(i)}>
                <QrTile data={q.text} />
                {editMode && (
                  <Button color="warning" onClick={() => deleteItem(q.id)}>
                    <i className="bi bi-trash3 float-end"></i>
                  </Button>)
                }
              </AccordionBody>
            </AccordionItem>
          ))
        }
      </Accordion>

      <hr />
      <p>Enter a URL, name it, and it creates a QR for you.</p>
      <Form style={{ padding: '1rem', backgroundColor: '#f0f8f0' }}>
        <FormGroup>
          <Label for="title">Name</Label>
          <Input
            id="title"
            name="title"
            placeholder="Name for this QR..."
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="url">Url</Label>
          <Input id="url" name="url" placeholder="https://..." type="url" value={txt} valid={urlRe.test(txt)}
            onChange={e => setTxt(e.target.value)}
          />
        </FormGroup>
        <Button onClick={addItem}
          disabled={!urlRe.test(txt)}
          color={urlRe.test(txt) ? 'success' : 'secondary'}><i className='bi bi-floppy'></i></Button>
      </Form>

      <Card>
        <CardBody>
          <FormGroup switch>

            <Label>
              <span color={editMode ? 'danger' : 'primary'}>
                Enable edit mode
              </span>
            </Label>

            <Input type="switch" role="switch" onChange={(e) => setEditMode(e.target.checked)} />

            {editMode &&
              <ConfirmedAction
                ok={deleteAll}
                title='Are you sure?'
                message='Do you really want to delete all items? This is cannot be undone.'
                buttonText='Delete All' 
                buttonIcon='bi-trash3' />
            }
          </FormGroup>

        </CardBody>
      </Card >

      <PWABadge />
    </>
  )
}

export default App
