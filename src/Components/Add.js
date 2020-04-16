import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../index.css';
import Datepicker from 'react-datepicker';
import { Input, Label } from 'reactstrap';

const Add = (props) => {
  return (
    <tbody>
      <tr align='center'>
        <td>
          <Label>Title</Label>
        </td>
        <td>
          <Input type='text' onChange={props.setTitle} />
        </td>
        <td>
          <Label>Author</Label>
        </td>
        <td>
          <Input type='text' onChange={props.setAuthor} />
        </td>
      </tr>
      <tr align='center'>
        <td>
          <Label>ISBN</Label>
        </td>
        <td>
          <Input
            type='text'
            onChange={props.setIsbn}
            className='customTextbox'
          />
        </td>
        <td>
          <Label>Publisher Date</Label>
        </td>
        <td>
          <Datepicker
            className='customTextbox form-control'
            dateFormat='MM-dd-yyyy'
            selected={props.selected}
            onChange={props.setDate}
          />
        </td>
      </tr>
      <tr align='center'>
        <td>
          <Label>Publisher</Label>
        </td>
        <td>
          <Input type='text' onChange={props.setPublisher} />
        </td>
        <td>
          <Label>Price</Label>
        </td>
        <td>
          <Input type='text' onChange={props.setPrice} />
        </td>
      </tr>
      <tr align='center'>
        <td>
          <Label>Genre</Label>
        </td>
        <td>
          <Input onChange={props.setGenre} type='select'>
            <option value=''></option>
            <option value='Novel'>Novel</option>
            {props.genre.map((Genre, index) => (
              <option key={index} value={Genre}>
                {Genre}
              </option>
            ))}
          </Input>
        </td>
        <td>
          <Label>Format</Label>
        </td>
        <td>
          <Input
            onChange={props.setFormat}
            type='select'
            defaultValue={{ label: 'PDF', value: 'PDF' }}
          >
            <option value=''></option>
            <option value='PDF' selected>
              PDF
            </option>
            {props.format.map((Format, index) => (
              <option key={index} value={Format}>
                {Format}
              </option>
            ))}
          </Input>
        </td>
      </tr>
    </tbody>
  );
};
export default Add;
