import { useEffect, useState } from 'react'
import PWABadge from './PWABadge.tsx'
import './App.css'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Button, Card, CardBody, Collapse, Form, FormGroup, Input, Label, Spinner, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { QrStorage, QrData } from './QrStorage';

import QrTile from './QrTile.tsx';

const urlRe = /https?:\/\/\w{1,}\.\w{2,}/;


function App() {
  const [dangerZone, setDangerZone] = useState<boolean>(false)
  const [txt, setTxt] = useState<string>('https://');
  const [name, setName] = useState<string>('');
  const [items, setItems] = useState<QrData[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
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

  // const deleteItem = (id: number) => {
  //   setItems(items.filter(item => item.id !== id));
  // };

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
      <img src='shareme.svg' style={{ height: '2rem' }}></img>
      <h1>Cherami</h1>
      <i>Pronounced like "Jeremy" but also like dear friend in French</i>
      {isLoading && <Spinner color="danger" type="grow">Loading...</Spinner>}
      {error && <div className="p-3 bg-danger my-2 rounded">
        <Toast><ToastHeader>Error</ToastHeader><ToastBody>{JSON.stringify(error)}</ToastBody></Toast>
      </div>}

      <Accordion open={open} toggle={toggle}>
        {
          items.map((q, i) => (
            <AccordionItem key={i}>
              <AccordionHeader targetId={String(i)}>
                {q.name}</AccordionHeader>
              <AccordionBody accordionId={String(i)}>
                <QrTile data={q.text} />
              </AccordionBody>
            </AccordionItem>
          ))
        }
      </Accordion>
      
      <hr />

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
        <Button color="primary" onClick={() => setDangerZone(!dangerZone)} style={{ marginBottom: '1rem' }}>
          Open Danger Zone
        </Button>
        <Collapse isOpen={dangerZone}>
          <Card>
            <CardBody>
              If you click this one, all data is lost.
              <Button onClick={deleteAll} >Trash</Button>
            </CardBody>
          </Card>
        </Collapse>
      </Card>

      <PWABadge />
    </>
  )
}

export default App