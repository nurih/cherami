import { useState } from 'react';
import { Button, Input, Card, CardBody, CardHeader } from 'reactstrap';
import { QrData } from './QrStorage';

function LocalFile({ data, addItems }: { data: QrData[], addItems: (items: QrData[]) => void }) {
  const [newItems, setNewItems] = useState<QrData[]>([]);

  const saveFile = () => {
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'shareami_data.json';
    link.click();
  };

  const handleFileRead = (event: ProgressEvent<FileReader>) => {
    const content = event.target?.result;
    setNewItems(JSON.parse(String(content)));
  };

  const handleFileChosen = (file: File) => {
    const reader = new FileReader();
    reader.onload = handleFileRead;
    reader.readAsText(file);
  };

  const addData = () => {
    const result = [...data, ...newItems]
    addItems(result);
  }

  return (
    <>
      {
        newItems.length == 0 && (
          <Card>

            <CardHeader>
              <h4>            Data Backup / Restore          </h4>
            </CardHeader>
            <CardBody>
              <em>Save or restore your data from a file on your device.</em>

              <div>
                <p>
                  Backup the data to a file on your device.
                </p>
                <Button onClick={saveFile}>
                  <i className="bi bi-download"></i>
                </Button>
              </div>
              <hr />
              <div >
                <p>Restore data from a file on your device.</p>
                <Input
                  id="restore"
                  type="file"
                  accept=".json"
                  onChange={e => {
                    if (e.target.files) handleFileChosen(e.target.files[0]);
                  }}
                  title='Restore from file'
                />


              </div>
            </CardBody>
          </Card>
        )
      }
      {
        newItems.length > 0 && (
          <Card>
            <CardHeader>
              <h4>Confirmation</h4>
            </CardHeader>
            <CardBody>
              <p>
                This add the items below to your your QR list <b>permanently</b>.
              </p>
              <ol>
                {newItems.map(e => (<li key={e.id}>{e.name}</li>))}
              </ol>
              <Button onClick={() => setNewItems([])} className='float-end' outline>
                <i className="bi bi-x-lg"></i> Cancel
              </Button>              
              <Button onClick={addData} className='float-end' color="success" outline>

                <i className="bi bi-check-lg"></i> Ok
              </Button>

            </CardBody>
          </Card >
        )
      }

    </>
  );
};

export default LocalFile;

