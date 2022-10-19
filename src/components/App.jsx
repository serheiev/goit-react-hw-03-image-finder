import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchApi } from 'api/api';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

const errorMessage = 'oops, no images';
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
    try {
      this.setState(() => ({ isLoading: true }));
      const { hits } = await fetchApi(query, page);
      if (hits.length === 0) {
        throw new Error(errorMessage);
      }
      if (page === 1) {
        this.setState(() => ({ images: hits }));
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
        }));
      }
    } catch {
      this.setState({ error: errorMessage });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  chengeNameSubmit = query => {
    this.setState(() => ({ query, page: 1, error: null }));
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
      error,
      modal: { isOpen, src, alt },
    } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.chengeNameSubmit} />
        {error && <div>{errorMessage}</div>}
        {isLoading && <Loader />}
        {!error && <ImageGallery images={images} openModal={this.openModal} />}
        {images.length > 0 && images.length % 12 === 0 && !error && (
          <Button showMore={this.loadMore} />
        )}
        {isOpen && <Modal closeModal={this.closeModal} src={src} alt={alt} />}
      </>
    );
  }
}
