import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function ConfirmedAction({ title, message, buttonText, buttonIcon, ok }: {
  title: string,
  message: string,
  ok: () => void,
  buttonText: string,
  buttonIcon: string
}) {
  const [modal, setModal] = useState(false);


  return (
    <>
      <Button onClick={() => setModal(!modal)} className='float-end'>
        <i className={"bi " + buttonIcon} ></i>{buttonText}
      </Button>
      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>{title}</ModalHeader>
        <ModalBody>
          {message}
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={ok}>
            <i className="bi bi-check-lg"></i>
          </Button>{' '}
          <Button color="secondary" onClick={() => setModal(!modal)}>
            <i className="bi bi-x-lg"></i>
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default ConfirmedAction;