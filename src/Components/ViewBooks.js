import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import AddModel from '../Components/Add';
import UpdateModal from '../Components/Update';
import DeleteModal from '../Components/Delete';
import {
  Table,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
} from 'reactstrap';
import axios from 'axios';
import uuid from 'uuid/v4';
import moment from 'moment';

function searchFor(searchText) {
  return function (books) {
    return (
      books.title.toLowerCase().includes(searchText.toLowerCase()) ||
      books.author.toLowerCase().includes(searchText.toLowerCase()) ||
      books.isbn.toLowerCase().includes(searchText.toLowerCase()) ||
      books.publicationDate.toLowerCase().includes(searchText.toLowerCase()) ||
      books.publisher.toLowerCase().includes(searchText.toLowerCase()) ||
      books.price.toLowerCase().includes(searchText.toLowerCase()) ||
      books.genre.toLowerCase().includes(searchText.toLowerCase()) ||
      books.format.toLowerCase().includes(searchText.toLowerCase()) ||
      !searchText
    );
  };
}
class ViewBook extends Component {
  state = {
    books: [],
    isNewBookModalOpen: false,
    modalTitle: '',
    bookIndex: '',
    searchText: '',
    genre: ['Fiction', 'History & Humanities', 'Fantasy', 'General'],
    format: ['Doc', 'Plain text', 'Comic book archive', 'Kindle file format'],
    newBook: {
      id: '',
      title: '',
      author: '',
      isbn: '',
      publicationDate: '',
      publisher: '',
      price: '',
      genre: '',
      format: '',
    },
    updateBook: {
      id: '',
      title: '',
      author: '',
      isbn: '',
      publicationDate: '',
      publisher: '',
      price: '',
      genre: '',
      format: '',
    },
    isDeleteBookModalOpen: false,
    errorMessage: '',
    deleteList: [],
    isMultiple: false,
    isAllChecked: false,
    isCheckedList: [],
  };
  componentDidMount() {
    this.refreshData();
  }
  searchHandler = (e) => {
    this.setState({ searchText: e.target.value });
  };
  setDate = (value) => {
    if (this.state.modalTitle === 'Add new book') {
      let { newBook } = this.state;
      newBook.publicationDate = moment(value).toDate();
      this.setState({ newBook });
    }
    if (this.state.modalTitle === 'Update book') {
      let { updateBook } = this.state;
      updateBook.publicationDate = moment(value).toDate();
      this.setState({ updateBook });
    }
  };
  setTitle = (value) => {
    if (this.state.modalTitle === 'Add new book') {
      let { newBook } = this.state;
      newBook.title = value;
      newBook.id = uuid();
      this.setState({ newBook });
    }
    if (this.state.modalTitle === 'Update book') {
      let { updateBook } = this.state;
      updateBook.title = value;
      this.setState({ updateBook });
    }
  };
  setAuthor = (value) => {
    if (this.state.modalTitle === 'Add new book') {
      let { newBook } = this.state;
      newBook.author = value;
      this.setState({ newBook });
    }
    if (this.state.modalTitle === 'Update book') {
      let { updateBook } = this.state;
      updateBook.author = value;
      this.setState({ updateBook });
    }
  };
  setIsbn = (value) => {
    if (this.state.modalTitle === 'Add new book') {
      let { newBook } = this.state;
      newBook.isbn = value;
      this.setState({ newBook });
    }
    if (this.state.modalTitle === 'Update book') {
      let { updateBook } = this.state;
      updateBook.isbn = value;
      this.setState({ updateBook });
    }
  };
  setPublisher = (value) => {
    if (this.state.modalTitle === 'Add new book') {
      let { newBook } = this.state;
      newBook.publisher = value;
      this.setState({ newBook });
    }
    if (this.state.modalTitle === 'Update book') {
      let { updateBook } = this.state;
      updateBook.publisher = value;
      this.setState({ updateBook });
    }
  };
  setPrice = (value) => {
    if (this.state.modalTitle === 'Add new book') {
      let { newBook } = this.state;
      newBook.price = value;
      this.setState({ newBook });
    }
    if (this.state.modalTitle === 'Update book') {
      let { updateBook } = this.state;
      updateBook.price = value;
      this.setState({ updateBook });
    }
  };
  setGenre = (value) => {
    if (this.state.modalTitle === 'Add new book') {
      let { newBook } = this.state;
      newBook.genre = value;
      this.setState({ newBook });
    }
    if (this.state.modalTitle === 'Update book') {
      let { updateBook } = this.state;
      updateBook.genre = value;
      this.setState({ updateBook });
    }
  };

  setFormat = (value) => {
    if (this.state.modalTitle === 'Add new book') {
      let { newBook } = this.state;
      newBook.format = value;
      this.setState({ newBook });
    }
    if (this.state.modalTitle === 'Update book') {
      let { updateBook } = this.state;
      updateBook.format = value;
      this.setState({ updateBook });
    }
  };
  updateBook = () => {
    axios
      .put(
        'http://localhost:4000/books/' + this.state.updateBook.id,
        this.state.updateBook
      )
      .then((res) => {
        this.refreshData();
      });
    this.setState({
      isNewBookModalOpen: false,
    });
  };
  refreshData() {
    axios
      .get('http://localhost:4000/books')
      .then((res) => this.setState({ books: res.data }))
      .catch((err) => console.log(err));
  }
  addData() {
    axios
      .post('http://localhost:4000/books', this.state.newBook)
      .then((res) => {
        let { books } = this.state;
        books.push(res.data);
        this.setState({
          books,
          isNewBookModalOpen: false,
          newBook: {
            id: '',
            title: '',
            author: '',
            isbn: '',
            publicationDate: '',
            publisher: '',
            price: '',
            genre: '',
            format: '',
          },
        });
      });
  }
  saveData = () => {
    if (this.state.modalTitle === 'Add new book') {
      if (this.validateAddbook(this.state.newBook)) {
        this.addData();
      } else {
        this.setState({
          isNewBookModalOpen: true,
        });
      }
    }
    if (this.state.modalTitle === 'Update book') {
      if (this.validateAddbook(this.state.updateBook)) {
        this.updateBook();
      } else {
        this.setState({
          isNewBookModalOpen: true,
        });
      }
    }
  };
  validateAddbook = (state) => {
    let bookFormFields = state;
    console.log('genre', !bookFormFields['genre']);
    console.log('format', !bookFormFields['format']);
    console.log('price', !bookFormFields['price']);
    if (
      !bookFormFields['title'] ||
      !bookFormFields['author'] ||
      !bookFormFields['isbn'] ||
      !bookFormFields['publicationDate'] ||
      !bookFormFields['publisher'] ||
      !bookFormFields['price'] ||
      !bookFormFields['genre'] ||
      !bookFormFields['format']
    ) {
      this.setState({ errorMessage: 'Please fill all the fields' });
      return false;
    } else {
      return true;
    }
  };
  toggleDeleteModal = (name, id = '') => {
    if (name === 'Delete') {
      this.setState({
        isDeleteBookModalOpen: !this.state.isDeleteBookModalOpen,
        bookIndex: id,
        isMultiple: false,
      });
    }
    if (name === 'MultipleDelete') {
      this.setState({
        isDeleteBookModalOpen: !this.state.isDeleteBookModalOpen,
        isMultiple: true,
      });
    } else {
      this.setState({
        isDeleteBookModalOpen: !this.state.isDeleteBookModalOpen,
      });
    }
  };
  toggleBookModal = (name, index = '', id = '') => {
    if (name === 'Add new book') {
      console.log(this.state.isCheckedList);
      console.log(this.state.deleteList);
      this.setState({
        isNewBookModalOpen: !this.state.isNewBookModalOpen,
        modalTitle: 'Add new book',
        date: '',
        newBook: {
          id: '',
          title: '',
          author: '',
          isbn: '',
          publicationDate: '',
          publisher: '',
          price: '',
          genre: '',
          format: '',
        },
        errorMessage: '',
      });
    } else if (name === 'Update') {
      console.log(index);
      this.setState({
        isNewBookModalOpen: !this.state.isNewBookModalOpen,
        modalTitle: 'Update book',
        updateBook: { ...this.state.books[index] },
        bookIndex: index,
        errorMessage: '',
      });
    } else {
      this.setState({
        isNewBookModalOpen: !this.state.isNewBookModalOpen,
        errorMessage: '',
      });
    }
  };
  deleteMultipleBooks() {
    this.state.deleteList.map((id) => {
      console.log(id);
      axios
        .delete('http://localhost:4000/books/' + id)
        .then((res) => {
          this.refreshData();
        })
        .catch((err) => {
          console.log(err);
        });
      return {};
    });
    this.setState({
      isDeleteBookModalOpen: !this.state.isDeleteBookModalOpen,
      isAllChecked: false,
      isCheckedList: [],
    });
    // console.log('brfore', this.state.deleteList);
    // this.refreshData();
    // window.location.reload(false);
  }
  deleteBook(id) {
    if (!this.state.isMultiple) {
      axios.delete('http://localhost:4000/books/' + id).then((res) => {
        this.refreshData();
        this.setState({
          isDeleteBookModalOpen: !this.state.isDeleteBookModalOpen,
          isAllChecked: false,
          isCheckedList: [],
        });
      });
    } else {
      this.deleteMultipleBooks();
    }
  }
  checkboxHandler = (e, id, i) => {
    let { deleteList } = this.state;
    const index = deleteList.indexOf(id);
    // let { isCheckedList } = this.state.isCheckedList;
    const isCheckedListChanged = [...this.state.isCheckedList];
    isCheckedListChanged[i] = !this.state.isCheckedList[i];
    // let checkedList = [this.state.deleteList];
    this.setState({ isCheckedList: isCheckedListChanged });
    // console.log(checkedList);
    console.log(i);
    if (isCheckedListChanged[i]) {
      deleteList.push(id);
      // this.setState({ isAllChecked: !this.state.isAllChecked });
    } else {
      deleteList.splice(index, 1);
    }
    if (this.state.books.length === deleteList.length) {
      this.setState({ isAllChecked: true });
    } else {
      this.setState({ isAllChecked: false });
    }
  };
  checkboxHeaderHandler = (e) => {
    console.log(this.state.books);
    if (e.target.checked) {
      this.setState({ isAllChecked: true });
      this.storeCheckboxStatus();
    } else {
      console.log('uncheck');
      this.setState({ isAllChecked: false });
      this.storeCheckboxStatus(false);
    }
  };
  storeCheckboxStatus = (singleCheckbox = false, id) => {
    let booksCheckbox = [];
    let bookIds = [];
    let state = !this.state.isAllChecked;
    // console.log(state);
    this.state.books.map((val, index) => {
      booksCheckbox.push(state);
      // if (singleCheckbox) {
      //   booksCheckbox[index] = true;
      // }
      if (state) {
        bookIds.push(val.id);
      }
      return {};
    });
    this.setState({
      isCheckedList: booksCheckbox,
      deleteList: bookIds,
      isAllChecked: state,
    });
  };
  render() {
    const {
      books,
      isNewBookModalOpen,
      modalTitle,
      searchText,
      genre,
      format,
      date,
      newBook,
      updateBook,
    } = this.state;
    let modalBody = null;
    if (modalTitle === 'Add new book') {
      modalBody = (
        <AddModel
          genre={genre}
          format={format}
          setTitle={(e) => this.setTitle(e.target.value)}
          setAuthor={(e) => this.setAuthor(e.target.value)}
          setIsbn={(e) => this.setIsbn(e.target.value)}
          setDate={(date) => this.setDate(date)}
          setPublisher={(e) => this.setPublisher(e.target.value)}
          setPrice={(e) => this.setPrice(e.target.value)}
          setGenre={(e) => this.setGenre(e.target.value)}
          setFormat={(e) => this.setFormat(e.target.value)}
          selected={newBook.publicationDate}
        />
      );
    }
    if (modalTitle === 'Update book') {
      modalBody = (
        <UpdateModal
          books={updateBook}
          genre={genre}
          format={format}
          setTitle={(e) => this.setTitle(e.target.value)}
          setAuthor={(e) => this.setAuthor(e.target.value)}
          setIsbn={(e) => this.setIsbn(e.target.value)}
          setDate={(date) => this.setDate(date)}
          setPublisher={(e) => this.setPublisher(e.target.value)}
          setPrice={(e) => this.setPrice(e.target.value)}
          setGenre={(e) => this.setGenre(e.target.value)}
          setFormat={(e) => this.setFormat(e.target.value)}
          selected={date}
        />
      );
    }
    const bookModal = books.filter(searchFor(searchText)).map((book, index) => {
      return (
        <tr key={book.id}>
          <td>
            <input
              type='checkbox'
              id={index}
              checked={this.state.isCheckedList[index]}
              onChange={(e) => this.checkboxHandler(e, book.id, index)}
            />
          </td>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>{book.isbn}</td>
          <td>{moment(book.publicationDate).format('MM-DD-YYYY')}</td>
          <td>{book.publisher}</td>
          <td>{book.price}</td>
          <td>{book.genre}</td>
          <td>{book.format}</td>
          <td>
            <Button
              color='success btn-sm'
              onClick={() => this.toggleBookModal('Update', index)}
            >
              Update
            </Button>
          </td>
          <td>
            <Button
              color='danger btn-sm'
              onClick={() => this.toggleDeleteModal('Delete', book.id)}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });
    return (
      <div className='App container'>
        <DeleteModal
          toggle={() => this.toggleDeleteModal()}
          isOpen={this.state.isDeleteBookModalOpen}
          click={() => this.deleteBook(this.state.bookIndex)}
        />
        <Modal
          className='Responsive modal-lg'
          isOpen={isNewBookModalOpen}
          toggle={() => this.toggleBookModal()}
        >
          <ModalHeader toggle={() => this.toggleBookModal()}>
            {modalTitle}
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Table responsive borderless>
                {modalBody}
              </Table>
            </FormGroup>
            <p className='error'>{this.state.errorMessage}</p>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={() => this.saveData()}>
              Save
            </Button>
            <Button color='secondary' onClick={() => this.toggleBookModal()}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <h1>Online Book Store</h1>
        <Table responsive borderless className='search'>
          <tbody>
            <tr>
              <td width='205px'>
                <Button
                  color='danger btn-md'
                  // disabled
                  onClick={() => this.toggleDeleteModal('MultipleDelete')}
                >
                  Delete multiple books
                </Button>
              </td>
              <td align='left'>
                <Button
                  color='primary btn-md'
                  onClick={() => this.toggleBookModal('Add new book')}
                >
                  Add book
                </Button>
              </td>
              <td align='right'>
                <h4>Search</h4>
              </td>
              <td align='left'>
                <div className='form-group col-lg-14'>
                  <input
                    type='text'
                    className='form-control'
                    onChange={(e) => this.searchHandler(e)}
                    value={searchText}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </Table>

        <Table responsive>
          <thead>
            <tr align='center'>
              <th>
                <input
                  type='checkbox'
                  checked={this.state.isAllChecked}
                  onChange={(e) => this.checkboxHeaderHandler(e)}
                />
              </th>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th className='customHeader'>Publisher Date</th>
              <th>Publisher</th>
              <th>Price</th>
              <th>Genre</th>
              <th>Format</th>
              <th className='customHeader' colSpan='2'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>{bookModal}</tbody>
        </Table>
      </div>
    );
  }
}

export default ViewBook;
