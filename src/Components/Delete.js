import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
} from 'reactstrap';

const DeleteBook = (props) => {
  return (
    <div>
      <Modal
        className='Responsive modal-lg'
        isOpen={props.isOpen}
        toggle={props.toggle}
      >
        <ModalHeader toggle={props.toggle}>Confirm delete</ModalHeader>
        <ModalBody>
          <FormGroup>
            <div>
              <p>Are you sure you want to delete?</p>
              <p>{props.message}</p>
            </div>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={props.click}>
            Yes
          </Button>
          <Button color='secondary' onClick={props.toggle}>
            No
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default DeleteBook;
