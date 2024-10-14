import { useEffect, useState } from 'react'
import PWABadge from './PWABadge.tsx'
import './App.css'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Button, Card, Form, FormGroup, Input, Label, Spinner, Toast, ToastBody, ToastHeader } from 'reactstrap';
import { QrStorage, QrData } from './QrStorage';

import QrTile from './QrTile.tsx';

import ListEditor from './ListEditor.tsx';

const urlRe = /https?:\/\/\w{1,}\.\w{2,}/;


function App() {
  const [txt, setTxt] = useState<string>('https://');
  const [name, setName] = useState<string>('');
  const [items, setItems] = useState<QrData[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState<string>('');

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

  const toggle = (id: string) => {
    if (open === id) {
      setOpen('');
    } else {
      setOpen(id);
    }
  };

  function saveItems(list: QrData[]) {
    setItems(list)
    setTxt('https://');
    setName('');

    store.save(list);
  }

  return (
    <>
      <div className='jumbotron'>
        <p className="fs-2 mb-2 align-center title">
          <img src='shareme.svg' style={{ height: '2rem' }} />
            Cher Ami
        </p>

        <p>Generate, save, and share your QR codes with ease! Free to use, works offline, no signup.</p>

      </div>

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
              </AccordionBody>
            </AccordionItem>
          ))
        }
      </Accordion>

      <p />
      <p>Enter a URL, name it, and it creates a QR for you.</p>
      <Form style={{ padding: '1rem', backgroundColor: '#F8F9FA' }}>
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

      <p />
      <Card>

        <FormGroup switch>
          <Label >
            {editMode ? (<p className='text-warning'>Editing</p>) : (<p className='text-info'>Edit my list</p>)}
          </Label>
          <Input type="switch" role="switch" onChange={(e) => setEditMode(e.target.checked)} />


        </FormGroup>
        {editMode &&
          <>
            <ListEditor items={items} updateItems={saveItems} />
          </>
        }

      </Card >

      <PWABadge />
    </>
  )
}

export default App
