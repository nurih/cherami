import { useEffect, useState } from 'react'
import PWABadge from './PWABadge.tsx'
import './App.css'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Button, Card, CardBody, Form, FormGroup, Input, Label, Spinner, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { QrStorage, QrData } from './QrStorage';

import QrTile from './QrTile.tsx';

const urlRe = /https?:\/\/\w{1,}\.\w{2,}/;


function App() {
  const [txt, setTxt] = useState<string>('https://');
  const [name, setName] = useState<string>('');
  const [items, setItems] = useState<QrData[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const store = new QrStorage();
  const [editMode, setEditMode] = useState(false);

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
        Cherami</h1>
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
                <QrTile data={q.text} editMode={editMode} />
                {editMode && (
                  <Button color="warning" onClick={()=> deleteItem(q.id)}>
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
      <Form style={{ backgroundColor: '#EEE', padding: '1rem' }}>
        <FormGroup>
          <Label for="title">
            Name
          </Label>
          <Input
            plaintext
            id="title"
            name="title"
            placeholder="Name..."
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="url">
            Url
          </Label>
          <Input id="url" name="url" placeholder="https://..." type="url" value={txt} valid={urlRe.test(txt)}
            onChange={e => setTxt(e.target.value)}
          />
        </FormGroup>
        <Button onClick={addItem}
          disabled={!urlRe.test(txt)}
          color={urlRe.test(txt) ? 'primary' : 'secondary'}>&#xFF0B;</Button>
      </Form>

      <Card>
        <CardBody>
          <Button onClick={() => setEditMode(!editMode)} color={editMode ? 'danger' : 'primary'} className='float-start'>
            <i className='bi bi-pencil'></i>
          </Button>

          {editMode && (
            <Button onClick={deleteAll} className='float-end' color='danger'>
              <i className='bi bi-trash3'> Delete all</i>
            </Button>
          )}
        </CardBody>
      </Card >

      <PWABadge />
    </>
  )
}

export default App
