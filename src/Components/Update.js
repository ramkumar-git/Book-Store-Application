import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../index.css';
import Datepicker from 'react-datepicker';
import { Input, Label } from 'reactstrap';
import moment from 'moment';

const Update = (props) => {
  return (
    <tbody>
      <tr align='center'>
        <td>
          <Label>Title</Label>
        </td>
        <td>
          <Input
            type='text'
            value={props.books.title}
            onChange={props.setTitle}
          />
        </td>
        <td>
          <Label>Author</Label>
        </td>
        <td>
          <Input
            type='text'
            value={props.books.author}
            onChange={props.setAuthor}
          />
        </td>
      </tr>
      <tr align='center'>
        <td>
          <Label>ISBN</Label>
        </td>
        <td>
          <Input
            type='text'
            className='customTextbox'
            value={props.books.isbn}
            onChange={props.setIsbn}
          />
        </td>
        <td>
          <Label>Publisher Date</Label>
        </td>
        <td>
          <Datepicker
            className='customTextbox form-control'
            selected={props.selected}
            dateFormat='MM-dd-yyyy'
            onChange={props.setDate}
            value={moment(props.books.publicationDate).format('MM-DD-YYYY')}
          />
        </td>
      </tr>
      <tr align='center'>
        <td>
          <Label>Publisher</Label>
        </td>
        <td>
          <Input
            type='text'
            value={props.books.publisher}
            onChange={props.setPublisher}
          />
        </td>
        <td>
          <Label>Price</Label>
        </td>
        <td>
          <Input
            type='text'
            value={props.books.price}
            onChange={props.setPrice}
          />
        </td>
      </tr>
      <tr align='center'>
        <td>
          <Label>Genre</Label>
        </td>
        <td>
          <Input
            type='select'
            value={props.books.genre}
            onChange={props.setGenre}
          >
            <option value=''></option>
            <option value='Novel'>Novel</option>
            {props.genre.map((Genre, index) => (
              <option key={index}>{Genre}</option>
            ))}
          </Input>
        </td>
        <td>
          <Label>Format</Label>
        </td>
        <td>
          <Input
            type='select'
            value={props.books.format}
            onChange={props.setFormat}
          >
            <option value=''></option>
            <option value='PDF'>PDF</option>
            {props.format.map((Format, index) => (
              <option key={index}>{Format}</option>
            ))}
          </Input>
        </td>
      </tr>
    </tbody>
  );
};
export default Update;
