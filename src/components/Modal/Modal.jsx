import { Component } from 'react';
import s from './Modal.module.scss';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModalByKey);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalByKey);
  }

  closeModalByKey = e => {
    if (e.key === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    const { closeModal, src, alt } = this.props;
    return (
      <>
        <div className={s.overlay} onClick={() => closeModal()}>
          <div className={s.modal}>
            <img src={src} alt={alt} />
          </div>
        </div>
      </>
    );
  }
}
