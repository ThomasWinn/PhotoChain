import React, { Component } from 'react';
import Identicon from 'identicon.js';

class Main extends Component {

  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
              <h2>Share Photo</h2>
              <form onSubmit={( event ) => {
                event.preventDefault()
                const description = this.photoDescription.value // may not work
                this.props.upload_photo(description)
              }} >
                <input type='file' accept='.jpg, .jpeg, .png, .bmp, .gif' onChange={ this.props.captureFile } />
                  <div className='form-group mr-sm-2'>
                    <br></br>
                      <input 
                        id='photoDescription'
                        type='text'
                        ref={ (input) => {this.photoDescription = input }}
                        className='form-control'
                        placeholder='Image description...'
                        required />
                  </div>
                  <button type='submit' class='btn btn-primary btn-block btn-lg'>Upload!</button>
              </form>
              <p>&nbsp;</p>
                
                {/* Code ... */}

            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Main;