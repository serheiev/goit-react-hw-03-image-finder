import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchApi } from 'api/api';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
    modal: { isOpen: false, src: '', alt: '' },
    isLoading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.fetchGallery(this.state.query, this.state.page);
    }
  }

  fetchGallery = async (query, page) => {
    const { hits } = await fetchApi(query, page);
    this.setState(() => ({ isLoading: true }));
    try {
      if (page === 1) {
        this.setState(() => ({ images: hits }));
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
        }));
      }
    } catch (error) {
      this.setState({ error: error.message });
      console.error(Error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  chengeNameSubmit = query => {
    this.setState(() => ({ query, page: 1 }));
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = (src, alt) => {
    this.setState(() => ({ modal: { isOpen: true, src, alt } }));
  };

  closeModal = () => {
    this.setState(() => ({ modal: { isOpen: false, src: '', alt: '' } }));
  };

  render() {
    const {
      images,
      isLoading,
      modal: { isOpen, src, alt },
    } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.chengeNameSubmit} />
        {/* {isLoading ? (
          <Loader />
        ) : (
          <ImageGallery images={images} openModal={this.openModal} />
        )} */}
        {isLoading && <Loader />}
        <ImageGallery images={images} openModal={this.openModal} />
        {images.length > 0 && images.length % 12 === 0 && (
          <Button showMore={this.loadMore} />
        )}
        {isOpen && <Modal closeModal={this.closeModal} src={src} alt={alt} />}
      </>
    );
  }
}
