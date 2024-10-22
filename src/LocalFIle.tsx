import { useState } from 'react';
import { Button, Input } from 'reactstrap';
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
    <div>
      <Button onClick={saveFile}>
        <i className="bi bi-download"></i> Backup list to device
      </Button>
      <div >
        <Input
          type="file"
          accept=".json"
          onChange={e => {
            if (e.target.files) handleFileChosen(e.target.files[0]);
          }}
          title='Restore from file'
        />
        {
          newItems.length > 0 && (
            <div>
              <Button onClick={addData}>
                <i className="bi bi-upload"></i> Restore list from device
              </Button> Items: {newItems.map(e => e.name).join(', ')}
            </div>
          )}
      </div>

    </div>
  );
};

export default LocalFile;

