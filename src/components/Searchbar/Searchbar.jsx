import { Component } from 'react';
import s from './Searchbar.module.scss';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputValue);
    this.setState(() => ({ inputValue: '' }));
  };

  inputSearchName = e => {
    const { value, name } = e.target;
    this.setState(() => ({ [name]: value }));
  };

  render() {
    const { inputValue } = this.state;
    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.button}>
            <span className={s.buttonLabel}>Search</span>
          </button>

          <input
            onChange={this.inputSearchName}
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            name="inputValue"
            value={inputValue}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
