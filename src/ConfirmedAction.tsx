import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function ConfirmedAction({ title, message, buttonText, buttonIcon, buttonColor, ok }: {
  title: string,
  message: string,
  buttonText: string,
  buttonIcon: string,
  buttonColor: string,

  ok: () => void,
}) {
  const [modal, setModal] = useState(false);

  function takeAction() {
    ok();
    setModal(!modal);
  }

  return (
    <>
      <Button onClick={() => setModal(!modal)} className='float-end' color={buttonColor}>
        <i className={"bi " + buttonIcon} ></i>{buttonText}
      </Button>
      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>{title}</ModalHeader>
        <ModalBody>
          {message}
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={takeAction}>
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